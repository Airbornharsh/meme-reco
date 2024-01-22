mod api;
mod models;
mod repository;

#[macro_use]
extern crate rocket;
use api::user_api::{create_user, get_user};
use dotenv::dotenv;
use repository::mongodb_repos::MongoRepo;
use rocket::{http::Status, serde::json::Json};

#[get("/")]
fn index() -> Result<Json<String>, Status> {
    Ok(Json(String::from("Hello, world!")))
}

#[launch]
fn rocket() -> _ {
    dotenv().ok();

    let db = MongoRepo::init();
    rocket::build()
        .manage(db)
        .mount("/", routes![index, create_user, get_user])
}
