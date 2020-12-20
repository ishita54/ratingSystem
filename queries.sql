CREATE TABLE `rate_movie`.`tb_movies` ( `movie_id` BIGINT(20) NOT NULL AUTO_INCREMENT , `movie_name` VARCHAR(200) NOT NULL , `is_active` TINYINT(1) NOT NULL DEFAULT '1' , `creation_datetime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`movie_id`)) ENGINE = InnoDB;


CREATE TABLE `rate_movie`.`tb_movies_rating` ( `id` BIGINT(20) NOT NULL AUTO_INCREMENT , `movie_id` BIGINT(20) NOT NULL , `email` VARCHAR(200) NOT NULL , `rate` FLOAT NOT NULL DEFAULT '0.0' , `comment` TEXT NULL , `creation_datetime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`), UNIQUE `movie_id_email` (`movie_id`, `email`) USING BTREE) ENGINE = InnoDB;