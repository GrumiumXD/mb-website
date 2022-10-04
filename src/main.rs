use std::fs;
use std::path::PathBuf;

use actix_web::{middleware::Logger, web, App, HttpServer};
use actix_web_lab::web::spa;
use env_logger::Env;

use argh::FromArgs;

mod assets;
use assets::AssetInfo;
mod handler;

#[derive(FromArgs, Debug)]
/// launch the backend mb server
struct Options {
    /// path to the bundled frontend
    #[argh(option, short = 'f', default = "String::from(\"dist\")")]
    frontend: String,

    /// port to run on
    #[argh(option, short = 'p', default = "8080")]
    port: u16,

    /// path to the assets config file
    #[argh(option, short = 'a', default = "String::from(\"assets.toml\")")]
    assets: String,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::new().filter_or("LOG_LEVEL", "info"));

    let options: Options = argh::from_env();

    let mut index_path = PathBuf::new();
    index_path.push(&options.frontend);
    index_path.push("index.html");

    let mut asset_path: PathBuf = PathBuf::new();
    asset_path.push(&options.assets);

    let asset_info = AssetInfo::new(asset_path).unwrap();
    let app_data = web::Data::new(asset_info);

    println!("Running server on port {}", options.port);

    HttpServer::new(move || {
        App::new()
            .app_data(app_data.clone())
            .wrap(Logger::default())
            .service(web::scope("/api").configure(handler::handler_config))
            .service(
                spa()
                    .index_file(format!("{}", index_path.display()))
                    .static_resources_location(options.frontend.clone())
                    .finish(),
            )
    })
    .bind(("0.0.0.0", options.port))?
    .run()
    .await
}
