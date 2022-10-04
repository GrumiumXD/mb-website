use serde::Deserialize;
use std::fs::{read_dir, File};
use std::io::{self, BufReader, Read};
use std::path::{Path, PathBuf};

#[derive(Deserialize, Debug)]
struct AlbumConfig {
    title: String,
    path: String,
}

#[derive(Deserialize, Debug)]
struct AssetConfig {
    albums: Vec<AlbumConfig>,
}

#[derive(Debug)]
pub struct Album {
    title: String,
    images: Vec<PathBuf>,
}

#[derive(Debug)]
pub struct AssetInfo {
    albums: Vec<Album>,
    random_images: Vec<PathBuf>,
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

        for al in config.albums.iter() {
            let directory = read_dir(&al.path)?;

            let images = directory
                .map(|fi| -> io::Result<PathBuf> {
                    let fi = fi?;

                    // check for file names starting with "_" for the random images
                    if fi.file_name().to_str().unwrap_or_default().starts_with("_") {
                        random_images.push(fi.path());
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
            albums,
            random_images: Vec::new(),
        })
    }

    pub fn get_albums(&self) -> &Vec<Album> {
        &self.albums
    }

    pub fn get_random_images(&self) -> &Vec<PathBuf> {
        &self.random_images
    }
}
