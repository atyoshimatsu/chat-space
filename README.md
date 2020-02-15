# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### index
- add_index :users, [:name, :email]

### Association
- has_many :groups through: :groups_users
- has_many :messages
- has_many :gropus_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### index
- add_index :groups, :name

### Association
- has_many :users through: :groups_users
- has_many :messages
- has_many :gropus_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### index
- add_index :groups_users, [:user_id, :group_id]

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### index
- add_index :messages, [:user_id, :group_id]

### Association
- belongs_to :group
- belongs_to :user