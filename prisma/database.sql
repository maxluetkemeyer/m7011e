DROP TABLE IF EXISTS user_group_member;
DROP TABLE IF EXISTS article_tag;

DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS article;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_group;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL
)

CREATE TABLE user_group (
    group_id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE user_group_member (
    group_id INTEGER,
    user_id INTEGER,
    PRIMARY KEY (group_id, user_id),
    FOREIGN KEY (group_id) REFERENCES user_group(group_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE article (
    article_id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    user_id INT REFERENCES users(user_id)
)

CREATE TABLE tag (
    tag_id SERIAL PRIMARY KEY,
    name TEXT
)

CREATE TABLE article_tag (
    article_id INT,
    tag_id INT,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES article(article_id),
    FOREIGN KEY (tag_id) REFERENCES tag(tag_id)
);

/*markdown
# INSERT DATA
*/

INSERT INTO
    user_group (name)
VALUES
    ('admin'),
    ('author'),
    ('reader');

INSERT INTO
    users (name, email, password_hash, salt)
VALUES
    ('Max', 'my@mail', '123', '123'),
    ('John', 'john@mail', '123', '123'),
    ('Jane', 'jane@mail', '123', '123');

INSERT INTO
    user_group_member (group_id, user_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);

INSERT INTO
    article (title, content, created_at, updated_at, user_id)
VALUES
    (
        'Title 1',
        'Content 1',
        '2020-01-01',
        '2020-01-01',
        1
    ),
    (
        'Title 2',
        'Content 2',
        '2020-01-01',
        '2020-01-01',
        2
    ),
    (
        'Title 3',
        'Content 3',
        '2020-01-01',
        '2020-01-01',
        3
    );

INSERT INTO
    tag (name)
VALUES
    ('tag1'),
    ('tag2'),
    ('tag3');

INSERT INTO
    article_tag (article_id, tag_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 2),
    (3, 3);