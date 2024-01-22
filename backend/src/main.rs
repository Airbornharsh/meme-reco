mod api;
mod models;
mod repository;

#[macro_use]
extern crate rocket;
use api::user_api::{create_user, get_user};
use dotenv::dotenv;
use repository::mongodb_repos::MongoRepo;
use rocket::{http::Status, serde::json::Json};
use rocket_cors::{AllowedOrigins, CorsOptions};

#[get("/")]
fn index() -> Result<Json<String>, Status> {
    Ok(Json(String::from("Hello, world!")))
}

#[launch]
fn rocket() -> _ {
    dotenv().ok();

    let db = MongoRepo::init();
    let cors = CorsOptions {
        allowed_origins: AllowedOrigins::all(),
        ..Default::default()
    }
    .to_cors()
    .expect("Error creating CORS configuration");
    rocket::build()
        .attach(cors)
        .manage(db)
        .mount("/", routes![index, create_user, get_user])
}
