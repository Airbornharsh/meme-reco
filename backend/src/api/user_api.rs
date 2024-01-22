use crate::{models::user::User, repository::mongodb_repos::MongoRepo};
use mongodb::results::InsertOneResult;
use rocket::{http::Status, serde::json::Json, State};

static MEMES: [&str; 3] = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStEBaU4Zx1XCUFwbmAXGJFkiT47CkAC3l6nQ&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStEBaU4Zx1XCUFwbmAXGJFkiT47CkAC3l6nQ&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8uQrvBKyPq3mbLa1xw8BF64G1qEpCVhnhsQ&usqp=CAU"];

#[derive(serde::Deserialize, Debug)]
pub struct TempUser {
    name: String,
    #[serde(rename = "otherName")]
    other_name: String,
}

#[post("/create-user", data = "<new_user>")]
pub fn create_user(
    repo: &State<MongoRepo>,
    new_user: Json<TempUser>,
) -> Result<Json<InsertOneResult>, Status> {
    let index = new_user.other_name.len() % 3;

    let data = User {
        id: None,
        name: new_user.name.clone(),
        other_name: new_user.other_name.clone(),
        meme_link: MEMES[index].to_string(),
    };
    let user_details = repo.insert_user(data);
    match user_details {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(Status::InternalServerError),
    }
}

#[get("/get-user/<user_id>")]
pub fn get_user(repo: &State<MongoRepo>, user_id: String) -> Result<Json<User>, Status> {
    let id = user_id;
    if id.is_empty() {
        return Err(Status::BadRequest);
    }
    let user_details = repo.get_user(&id);
    match user_details {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(Status::InternalServerError),
    }
}
