DROP TABLE IF EXISTS user_group_member;
DROP TABLE IF EXISTS article_tag;

DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS article;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_group;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
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
    (
        'Max', -- hello123
        'my@mail',
        '7f3b239c87d63d1e9588d935cdeeff5f849a47fcf9b7d6ae43f335f0abd36f63ce8e92395191231104004e0484b5375658705364ef2a8b04da3c8089b19e14b24109e2be72af85e31e5afc5db25766def8256d9b9e654451670c8e8f22c7a45d8c10c86221d00987594822aadd8cd1895e17e0e83a292ac75f5ade0b21fdfbc8418f48ed10a2dcad6c042747b02f47c711d3c04e70cbbb3403001e833ef58f1615f8b313507cf2aa469e2bd1a8acf7898cfa1f3af3d7c730661ac65d84a516349eccef02a21a3d18b30f36101a5bbdb920d6154e5156c82bdce27c453681b993707a6f8e9f8f4a8f461744b24b8b8eaa9d5cb35a502e531f780892a54e1c418e34da5752aae98222bf5a4420b0fd37357f856a7ebbb76b6cbfc1a189636d41273545ddf03e185ebcd78d902f26a32f8e70cb7e8699bcd90984cf519779700034a33659bcb310ffa808e5dd3e82864e2f8104c2b763ab13bb3e100d2aee632c0f9e6b3f64dd42ec853340ffdcad90b40bb88b1776d93321b33aeece1d91ecfb609b3d5a0780148c899fa0fd1f5dad47f6b12033394be1da1d7cfca7191fa7504e365a17f30244cffa34ef8793847248e27bb6ab55103994261c60b1ede9dc4cc0956c5dde97a2650ece2fe4fa1c99ee298e80b5c7097418085b493659586ddfe180d9ef7ce196736d762c7c4d5dd68c602a1e3d45ab18e2c8dd13832d248aebbf',
        'cfa3c8e9a51ff4dab78f9105daa1af271223da4ca88ed0874506a2dfea9ab710bc4cf024362b889490edd593324b4e82796ca3535812b6b6c2c9269c6b48bd8329b36d19e5f10cc0475360abf5cadbe89d3a84b6346187445befad0c7f761ef4eb1aa2c2d331c7415ececb036bb91fae609b7c62135818ad4c22433c85bdfe6e'
    ),
    ('John', 'john@mail', '123', '123'),
    ('Jane', 'jane@mail', '123', '123');

INSERT INTO
    user_group_member (group_id, user_id)
VALUES
    (1, 1),
    (2, 1),
    (2, 2),
    (3, 3);

INSERT INTO
    article (title, content, created_at, updated_at, user_id)
VALUES
    (
        'Title 1',
        'Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.',
        '2024-01-01',
        '2020-01-01',
        1
    ),
    (
        'Title 2',
        'Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.',
        '2024-01-02',
        '2020-01-01',
        2
    ),
    (
        'Title 3',
        'Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.',
        '2024-01-03',
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