use rand::{seq::SliceRandom, thread_rng};
use serde::Deserialize;
use simple_error::{SimpleError, SimpleResult};
use std::fs::{read_dir, File};
use std::io::{self, BufReader, Read};
use std::path::{Path, PathBuf};

// some helper structs for parsing the config file
#[derive(Deserialize)]
struct AlbumConfig {
    title: String,
    path: String,
}

#[derive(Deserialize)]
struct AssetConfig {
    asset_path: String,
    slideshow_count: usize,
    albums: Vec<AlbumConfig>,
}

// the structs for holding the asset data
pub struct Album {
    title: String,
    images: Vec<PathBuf>,
}

pub struct AssetInfo {
    asset_path: String,
    slideshow_count: usize,
    albums: Vec<Album>,
    random_images: Vec<(usize, PathBuf)>,
}

impl AssetInfo {
    fn read_config<P>(path: P) -> io::Result<AssetConfig>
    where
        P: AsRef<Path>,
    {
        // read the config file into a string
        let file = File::open(path)?;
        let mut buf_reader = BufReader::new(file);
        let mut contents = String::new();
        buf_reader.read_to_string(&mut contents)?;

        // deserialize it
        let config: AssetConfig = toml::from_str(&contents)?;

        Ok(config)
    }

    pub fn new<P>(path: P) -> io::Result<AssetInfo>
    where
        P: AsRef<Path>,
    {
        let config = Self::read_config(path)?;

        // build the album structure
        let mut albums = Vec::<_>::new();
        let mut random_images = Vec::<_>::new();

        for (index, al) in config.albums.iter().enumerate() {
            let directory = read_dir(&al.path)?;

            let images = directory
                .map(|fi| -> io::Result<PathBuf> {
                    let fi = fi?;

                    // check for file names starting with "_" for the random images
                    if fi.file_name().to_str().unwrap_or_default().starts_with('_') {
                        random_images.push((index, fi.path()));
                    }

                    Ok(fi.path())
                })
                .collect::<Result<Vec<_>, _>>()?;

            albums.push(Album {
                title: al.title.clone(),
                images,
            });
        }

        Ok(AssetInfo {
            asset_path: config.asset_path,
            slideshow_count: config.slideshow_count,
            albums,
            random_images,
        })
    }

    pub fn get_asset_path(&self) -> &str {
        &self.asset_path
    }

    pub fn get_album_list(&self) -> Vec<String> {
        let albums = self
            .albums
            .iter()
            .map(|a| a.title.clone())
            .collect::<Vec<_>>();

        albums
    }

    pub fn get_album(&self, index: usize) -> SimpleResult<Vec<PathBuf>> {
        let images = self
            .albums
            .get(index)
            .ok_or_else(|| SimpleError::new("album index out of bounds"))?
            .images
            .to_vec();

        Ok(images)
    }

    pub fn get_random_images(&self) -> Vec<(usize, PathBuf)> {
        self.random_images
            .choose_multiple(&mut thread_rng(), self.slideshow_count)
            .cloned()
            .collect()
    }
}
