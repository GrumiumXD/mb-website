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
struct MediaConfig {
    media_path: String,
    slideshow_count: usize,
    albums: Vec<AlbumConfig>,
}

// the structs for holding the asset data
pub struct Album {
    title: String,
    images: Vec<PathBuf>,
}

pub struct MediaInfo {
    media_path: String,
    slideshow_count: usize,
    albums: Vec<Album>,
    random_images: Vec<(usize, PathBuf)>,
}

impl MediaInfo {
    fn read_config<P>(path: P) -> io::Result<MediaConfig>
    where
        P: AsRef<Path>,
    {
        // read the config file into a string
        let file = File::open(path)?;
        let mut buf_reader = BufReader::new(file);
        let mut contents = String::new();
        buf_reader.read_to_string(&mut contents)?;

        // deserialize it
        let config: MediaConfig = toml::from_str(&contents)?;

        Ok(config)
    }

    pub fn new<P>(path: P) -> io::Result<MediaInfo>
    where
        P: AsRef<Path>,
    {
        let config = Self::read_config(path)?;

        // build the album structure
        let mut albums = Vec::<_>::new();
        let mut random_images = Vec::<_>::new();

        for (index, al) in config.albums.iter().enumerate() {
            // concatenate the media directory with the album directory
            let album_path = PathBuf::from_iter([&config.media_path, &al.path].iter());
            let directory = read_dir(&album_path)?;

            let images = directory
                .map(|fi| -> io::Result<PathBuf> {
                    let fi = fi?;

                    // strip the media directory from the path
                    let image_path = fi.path();
                    let stripped_path = image_path.strip_prefix(&config.media_path).unwrap();

                    // check for file names starting with "_" for the random images
                    if fi.file_name().to_str().unwrap_or_default().starts_with('_') {
                        random_images.push((index, PathBuf::from(stripped_path)));
                    }

                    Ok(PathBuf::from(stripped_path))
                })
                .collect::<Result<Vec<_>, _>>()?;

            albums.push(Album {
                title: al.title.clone(),
                images,
            });
        }

        Ok(MediaInfo {
            media_path: config.media_path,
            slideshow_count: config.slideshow_count,
            albums,
            random_images,
        })
    }

    pub fn get_media_path(&self) -> &str {
        &self.media_path
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
