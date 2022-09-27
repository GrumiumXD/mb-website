use actix_web::web;

mod galeries;

pub fn handler_config(cfg: &mut web::ServiceConfig) {
    cfg.service(galeries::galeries);
}
