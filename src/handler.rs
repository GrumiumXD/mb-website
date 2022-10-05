use actix_web::{error, get, web, Responder};

use crate::media::MediaInfo;

#[get("/gallery")]
pub async fn galleries(data: web::Data<MediaInfo>) -> actix_web::Result<impl Responder> {
    let albums = data.get_album_list();

    Ok(web::Json(albums))
}

#[get("/gallery/{index}")]
pub async fn gallery(
    path: web::Path<usize>,
    data: web::Data<MediaInfo>,
) -> actix_web::Result<impl Responder> {
    let index = path.into_inner();

    let album = data.get_album(index).map_err(error::ErrorBadRequest)?;

    Ok(web::Json(album))
}

#[get("/slideshow")]
pub async fn slideshow(data: web::Data<MediaInfo>) -> actix_web::Result<impl Responder> {
    let random_images = data.get_random_images();

    Ok(web::Json(random_images))
}

pub fn handler_config(cfg: &mut web::ServiceConfig) {
    cfg.service(galleries).service(gallery).service(slideshow);
}
