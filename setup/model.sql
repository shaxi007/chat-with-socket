CREATE TABLE messages(
	message_id SERIAL PRIMARY KEY,
	message_title VARCHAR NOT NULL,
	message_time timestamptz default current_timestamp,
	username VARCHAR,
	active BOOl
);

CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
	username VARCHAR
);
