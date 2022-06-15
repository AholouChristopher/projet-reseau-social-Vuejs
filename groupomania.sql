-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 15 juin 2022 à 15:15
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `idMessage` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `imageUrl` varchar(250) DEFAULT NULL,
  `liked` int(11) NOT NULL DEFAULT '0',
  `usersLiked` json NOT NULL,
  PRIMARY KEY (`idMessage`)
) ENGINE=MyISAM AUTO_INCREMENT=445 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`idMessage`, `idUser`, `name`, `description`, `imageUrl`, `liked`, `usersLiked`) VALUES
(440, 30, 'AHOLOU', 'coucou', NULL, 2, '[34, 30]');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `admin` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `admin`) VALUES
(2, 'BRETEAUDAU', 'lisa.breteaudau@gmail.com', '$2b$10$yr.fO0LygvWXGmu.hc22seQZbqcJFGKRatYPQT65/coXh9qsnk126', NULL),
(31, '', '', '', NULL),
(4, 'BRUNO', 'destal.bruno@gmail.com', '$2b$10$eAbNDO096TDzKW9EYxmEoeaRdWsKIlL7v2MW1fUF2RvtMdcizK1CW', NULL),
(5, 'REMI', 'destal.remi@gmail.com', '$2b$10$9Te/LsgPLUCBeCCRaOJwDu2OKFzcVYtv8w4rCYdUWGTIwQk.OVChS', NULL),
(6, 'JOKA', 'querel.joka@gmail.com', '$2b$10$MqpmLV6SRn0Y3663/rhQzuPxGTWkxH8bowXlqiNw5LlYKDcwuKUHK', NULL),
(8, 'AHOLOUA1a', 'chris123.aholou@gmail.com', '$2b$10$hkkw27POYZ7SJfJEeXg2rOM4hsCU5TTk/6txGAAh/EI50zYr21I4O', NULL),
(9, 'AHOLOUggg', 'chrisssssssssss.aholou@gmail.com', '$2b$10$IEPpOzdQSl6w4aw0V8Pgr.QCQKa5fNg7Nccv5DWXZ1f78bUNdTcMm', NULL),
(10, 'goku', 'goku@hotmail.fr', '$2b$10$9SwlCT5YQS/G7wsH02VqwO8f.yM1FzOkLzc1vgwWch7RdQQzxEL6y', NULL),
(11, 'vegeta', 'vegeta@hotmail.fr', '$2b$10$7Knnj3Lpn68DJq60ubXkdO3DkVyvp2Ab/S11aguckCwYdCEKQ32da', NULL),
(12, 'Krillin', 'Krillin@gmail.com', '$2b$10$lNfXUYxDlbu8sjI6cDrHZuLWHprku0xPylxnLCw7ONShQBeXcIcD.', NULL),
(13, 'C18', 'C18@gmail.com', '$2b$10$lYWN41QgtdnYGMQN4B4JJe6R1dC0nns8YpMiUNpImA3h2Sn9omlzi', NULL),
(14, 'C19', 'C19@gmail.com', '$2b$10$9hb/AfLfyDuia28PJr8KbOK9YJs1GDV0L7wyfATCx.0VYjoZnRH4u', NULL),
(15, 'Yamcha', 'yam.aholou@gmail.com', '$2b$10$5eEu5AtJMfeuJfDAfLSTseYecGIS/6t6/Kqj6wDprmaxKU8DpO7Ni', NULL),
(16, 'pogba', 'pogba.aholou@gmail.com', '$2b$10$S7F.u4xuXDvKAj00g3MPROq78CC8iD7slv18PAizdmBgpdDuboycG', NULL),
(17, 'Mpappe', 'Mpappe.aholou@gmail.com', '$2b$10$6cktqZTP6azWHwMblJ0xhup0h/pZuINRkR4cB/OwNEu7ljpGd0wpK', NULL),
(18, 'nezuko', 'nezuko@hotmail.fr', '$2b$10$5Hs53M/ZUyFVSTvxnH0iHOUm7GwB4YIhwgLlPCmYdzELFbhUUd7ou', NULL),
(19, 'Leo', 'Leo@gmail.com', '$2b$10$wFn/Wmaz3r9K43oUgeGDhedT0mC8i09bXrqm.rAaTnRv5mR/unnr.', NULL),
(20, 'Shanks', 'Shanks@gmail.com', '$2b$10$EPt93uoOb1AZPbHoDjzG7.YoOj4Mo.uRNqv1wFEoXsImvXr8vrnvy', NULL),
(21, 'vincent', 'vincent.aholou@gmail.com', '$2b$10$AVPO62zAmIL5iA2310k2GedgP/xJJYt.K/CwlegjjKzzyxWFjg1Vu', NULL),
(30, 'AHOLOU', 'chris.aholou@gmail.com', '$2b$10$yhRAUWe3Y3XdRrurhI7DY.RRqVRoqp4TK9wglpXy1OrBH4hZi77hG', 1),
(32, 'lili', 'alison.aholou@gmail.com', '$2b$10$wTvTSZKsuzNjWBojSCiAIemL9BzQOSEeCqmbVHApnoJQA3o2np2Q.', NULL),
(33, 'sam', 'stepahan.samuel@gmail.com', '$2b$10$Ds06HSuIqFsRpXb70cICDOXfKhj0j4s9wRfkQZbYrZgwySWINdLra', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
