use std::env;

use mongodb::{
    bson::{doc, extjson::de::Error, oid::ObjectId},
    results::InsertOneResult,
    sync::{Client, Collection},
};
// use rocket::futures::future::ok;

// use crate::models::meme::Meme;
use crate::models::user::User;

pub struct MongoRepo {
    user_col: Collection<User>,
    // meme_col: Collection<Meme>,
}

impl MongoRepo {
    pub fn init() -> Self {
        let db_url = env::var("DATABASE_URL").expect("DATABASE_URL not set in .env");
        let client = Client::with_uri_str(&db_url).unwrap();
        let db = client.database("test");
        // let meme_col = db.collection("memes");
        let user_col = db.collection("users");
        MongoRepo { user_col }
    }

    pub fn insert_user(&self, user: User) -> Result<InsertOneResult, Error> {
        let new_doc = User {
            id: None,
            name: user.name,
            other_name: user.other_name,
            meme_link: user.meme_link,
        };
        let user = self
            .user_col
            .insert_one(new_doc, None)
            .ok()
            .expect("Error Creating User");
        Ok(user)
    }

    pub fn get_user(&self, id: &str) -> Result<User, Error> {
        let object_id = ObjectId::parse_str(id).unwrap();
        let user = self
            .user_col
            .find_one(
                Some(doc! {
                    "_id": object_id
                }),
                None,
            )
            .ok()
            .expect("Error Finding User");
        Ok(user.unwrap())
    }

    // pub fn get_meme(&self, meme_id: String) -> Result<Meme, Error> {
    //     let meme = self
    //         .meme_col
    //         .find_one(
    //             Some(doc! {
    //                 "_id": meme_id
    //             }),
    //             None,
    //         )
    //         .ok()
    //         .expect("Error Finding Meme");
    //     Ok(meme.unwrap())
    // }
}
