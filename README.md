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

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false, unique: true|

### index
- add_index :groups, :groupname

### Association
- has_many :users through: :groups_users

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