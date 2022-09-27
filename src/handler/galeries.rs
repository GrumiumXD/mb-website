use actix_web::{get, HttpResponse, Responder};

#[get("/galeries")]
pub async fn galeries() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}
