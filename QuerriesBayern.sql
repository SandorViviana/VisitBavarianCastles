create database BavarianCastlesVisitPlanner

use BavarianCastlesVisitPlanner

CREATE TABLE PlannerUser (
    userId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    username VARCHAR(30) UNIQUE,
    password VARCHAR(30) NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL
)

create table Castle (
	castleId INT IDENTITY(1,1) PRIMARY KEY,
	name varchar(30) NOT NULL,
	city varchar(30) NOT NULL,
	description varchar(1000),
	imageUrl varchar(500),
	latitude FLOAT NOT NULL,
	longitude FLOAT NOT NULL
)

create table VisitRecords (
	recordId INT IDENTITY(1,1) PRIMARY KEY,
	userId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PlannerUser(userId) ON DELETE CASCADE,
	castleId INT FOREIGN KEY REFERENCES Castle(castleId),
	visitDate DATE,
	addDate DATE,
	status varchar(30)
)

CREATE TRIGGER trig_set_AddData
ON VisitRecords
AFTER INSERT
AS
BEGIN
    
	UPDATE VisitRecords
	SET addDate = GETDATE();
END

INSERT INTO Castle (name, city, description, imageUrl, latitude, longitude) VALUES
('Ansbach Residence', 'Ansbach', 
'The Residence of Ansbach originated as a medieval complex. However, it was redesigned as a modern residence between 1705 and 1730 and now 
 the Ansbach Residence is primarily famous for its outstanding interiors, most of which were designed by the architect Leopoldo Retti and completed between 1734 and 1745. ',
  'https://webimages.we2p.de/2/romantisches-franken/entity/gallery/61d7e9f0b7cfe74ae20595a0/Ansbach_Residenz_Florian_Trykowski_DJI_0580_950.jpg',49.303056, 10.575833),
('Johannisburg Palace', 'Aschaffenburg', 
'Johannisburg Palace, until 1803 the second residence of the archbishop-electors of Mainz, is located in the centre of Aschaffenburg by the River Main. The massive four-winged 
complex, built from 1605 to 1614 under Archbishop-Elector Johann Schweikard von Kronberg, is one of the most important examples of palace architecture from the German Late 
Renaissance era.',
'https://external-preview.redd.it/krpqWvdinzvc90S4sazQKaAGHaZfKtvvHRbT9PG8tcE.jpg?auto=webp&s=e68bf4dcba9ebcb7b8fd1c24e7181545b343d863', 49.976111, 9.141667),
('New Residence', 'Bamberg', 
'The life-style and status of the prince-bishops is illustrated by the New Residence with its magnificent fa�ades on the opposite side of the cathedral square. 
The two baroque wings were built from 1697 to 1703 under Prince-Bishop Lothar Franz von Sch�nborn from plans by Leonhard Dientzenhofer. 
The New Residence was the first large palace to be built in Franconia in the age of absolutism. Until 1802 it was the seat of the Bamberg prince-bishops, who were not only 
heads of the church, but were also the secular rulers of the region.',
'https://www.residenz-bamberg.de/bilder/residenz/residenz_rosengarten500.jpg', 49.891667, 10.8825)


INSERT INTO Castle (name, city, description, imageUrl, latitude, longitude) VALUES
('Seehof Palace', 'Memmelsdorf',
'The prince-bishop�s summer residence north-east of Bamberg originated as a hunting lodge and country house dating from the end of the 15th century. 
The present four-winged complex with its striking corner towers, based on the Aschaffenburg palace, was begun in 1687 under the Bamberg Prince-Bishop 
Marquard Sebastian Schenk von Stauffenberg from plans by the architect Antonio Petrini from northern Italy.',
'https://life-globe.com/image/cache/catalog/germany/bamberg/dvorets-seehof/schloss-seehof-8-500x387.jpg',49.9269, 10.9478),
('New palace', 'Bayreuth',
'Although the Old Palace erected in the 17th century was an imposing building, it no longer satisfied the requirements of the baroque court.
Its destruction in a fire in January 1753 brought forward the decision to build a new palace, which was thus begun in the same year under 
Margrave Friedrich von Brandenburg-Bayreuth. As with the Old Hermitage Palace, his wife Wilhelmine had a major influence on the design of the rooms.',
'https://www.bayreuth-wilhelmine.de/bilder/erem_ns/ns-eremitage_blumen450.jpg', 49.94211, 11.57697),
('Margravial Opera House', 'Bayreuth',
'The Margravial Opera House is the best preserved example of a free-standing Baroque court theatre. It was modelled on the greatest opera
houses of the time in Vienna and Dresden. As a unique monument of 18th-century festival and music culture it was inscribed by UNESCO in the
list of World Cultural Heritage of Humanity in 2012.',
'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/477000/477077-Margraves-Opera-House.jpg', 49.944444, 11.578611),
('Zwernitz Castle', 'Wonsees',
'Zwernitz, originally the hereditary seat of the Walpodes of Upper Franconia, is located in an area used for centuries by the local rulers 
for hunting. The keep and the tithe barn made of rusticated ashlars are part of the original Romanesque complex built in 1200. In 1338 the 
castle came into the possession of the Hohenzollern family.
When the rock garden was laid out, it was designed to incorporate a view of the castle located on a natural elevation above it. 
From the keep there is a magnificent panoramic view of the Franconian Switzerland Natural Park. ',
'https://d2exd72xrrp1s7.cloudfront.net/www/000/1k3/a8/a8spw177hhwr1lor9rkixa6zt34clngny-uhi8030308/0?width=768&height=576&crop=true', 49.9835, 11.3155)


INSERT INTO Castle (name, city, description, imageUrl, latitude, longitude) VALUES
('Burghausen Castle', '-', 
'Burghausen Castle with a total length of a little over 1,000 metres is one of the longest castle complexes in Europe. It is picturesquely
situated along a rocky spur between the Salzach river and W�hrsee above the town of Burghausen. With its mighty towers and walls, ditches, 
bridges and gates enclosing many substantial buildings, it is still today an impressive monument to the art of castle building in the 
Middle Ages, and a demonstration of the power and importance of the Bavarian dukes. ',
'https://images.westend61.de/0000698352pw/burghausen-castle-morning-fog-HAMF000117.jpg', 48.166667, 12.833333),
('Coburg Castle', 'Coburg',
'The castle was first mentioned in a document in 1056. In 1353 it became the property of the House of Wettin. Because of its strategic
importance it was enlarged over the next 150 years to become one of the largest castle complexes in Germany. After the court transferred
to the city in the 16th century, the castle served solely as a state fortress. ',
'https://www.castlesworld.com/images/veste_coburg.jpg', 50.26, 10.98),
('Ehrenburg Palace', 'Coburg',
'Ehrenburg Palace was built by the Coburg dukes in the 16th century as a representative town residence. The building, which was to be 
constructed on the site of a Franciscan monastery no longer in operation, was commissioned in the year 1543 by Johann Ernst von 
Sachsen-Coburg. Only five years later the duke was able to move his court from the fortress on the castle hill down into the town. 
Emperor Karl V is said to have given the complex with its three wings the name Ehrenburg (�Palace of Honour�) because the building was 
completed without the use of compulsory labour. ',
'https://1.bp.blogspot.com/-kBTFOLVWR8A/XRZWRczNMlI/AAAAAAAAVTc/HGHon9-0jJEjQelH4BXwkwM6o0MKTqxHACLcBGAs/s1600/Ehrenburg%2B1.JPG', 50.258056, 10.967222)


INSERT INTO Castle (name, city, description, imageUrl, latitude, longitude) VALUES
('Herrenchiemsee New Palace', 'Herrenchiemsee',
'King Ludwig II’s original idea was to have a copy of Versailles Palace built on the Herreninsel as a "Temple of Fame" in honour of the 
Sun King Louis XIV of France. Started in 1878, it was thus intended purely as a monument to absolute monarchy and had no practical function.
The architect Georg Dollmann was obliged to study the original model and even reconstruct rooms which had long ceased to exist in Versailles.',
'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/a7/f8/e5/schloss-herrenchiemsee.jpg?w=1200&h=-1&s=1',
47.860208, 12.400311),
('Linderhof Palace ', 'Linderhof', 
'Linderhof Palace and its surrounding park is one of the most artistic and stylistically complex ensembles of the 19th century. 
The "Royal Villa" is the only palace King Ludwig II of Bavaria (1845–1886) was able to complete (1878). It is influenced by French architecture
and modelled on the small summer palaces, usually set in parkland, that were built in France in the 18th century and were also often to be found 
in Germany in the parks of larger palaces. ',
'https://cdn.getyourguide.com/img/location/5963124211bbb.jpeg/70.jpg', 47.571667, 10.960556),
('Lauenstein Castle', 'Ludwigsstadt ',
'Lauenstein Castle is located north of Kronach, not far from the Franconian-Thuringian border. The oldest sections of it date back to the 
12th century; from the 13th until well into the 15th century the castle was the seat of the once powerful Thuringian counts of Orlamünde. 
Following their decline it passed through various hands before the castle and territory of Lauenstein were taken over by the lords of Thyna.',
'https://www.luftbildsuche.de/foto/detail/luftbilder-burg-lauenstein-bayern-123194.jpg', 50.513306, 11.369733),
('Munich Residence', 'Munich',
'The history of the Munich court began when Duke Ludwig the Severe moved his court here from Landshut after the partition of Bavaria in 1255.
As dukes, electors and finally kings, the Wittelsbachs developed their Residence from a small moated castle begun in 1385 to an extensive 
complex built around ten courtyards. For four centuries (until 1918) the Munich Residence was the seat of government and residence of the 
Wittelsbach dynasty. The palace spans the styles of four different centuries.',
'https://m.sworld.co.uk/img/img/67/photoAlbum/2552/originals/0.jpeg',48.141111, 11.578056),
('Nymphenburg Palace ', 'Munich',
'With its unique combination of architecture and garden design, the palace and park complex of Nymphenburg is one of the best examples
in Europe of a synthesis of the arts. In 1664, following the birth of the heir to the throne, Max Emanuel, Elector Ferdinand Maria of 
Bavaria and his wife Henriette Adelaide of Savoy commissioned the architect Agostino Barelli to build Nymphenburg Palace. Elector Max 
Emanuel had the complex extended from 1701 with side galleries and residential pavilions designed by Henrico Zuccalli.',
'https://kasadoo.com/assets/site/images/album/Germany/Munich/Nymphenburg-Palace-and-the-fountain.jpg', 48.158056, 11.503611),
('Neuburg Palace', 'Neuburg an der Donau',
'Neuburg Palace on the banks of the Danube was once the residence of the principality of Pfalz-Neuburg, founded in 1505. This impressive 
palace complex, with its four mighty wings enclosing an arcaded courtyard, was built on the site of a late-Gothic ducal castle. Count 
Palatine Wolfgang von Zweibrücken commissioned the Dutch master Hans Schroer to decorate the courtyard façade. Carried out between 1560 
and 1562, these biblical scenes in sgraffito technique are one of the special attractions of the palace. ',
'https://m.media-amazon.com/images/I/91p4OR-L2mL.jpg', 48.737, 11.181),
('Imperial Castle of Nuremberg ', 'Nuremberg',
'During the Middle Ages, the Imperial Castle in Nuremberg was one of the most important imperial palaces in the Holy Roman Empire. For 
centuries it stood at the heart of European history and was a secure base and prestigious residence for the Empire’s head of state. 
Erected over earlier buildings under the Hohenstaufen dynasty and its successors, the extensive castle complex is famous all over the 
world as the symbol of Nuremberg. ',
'https://img.itinari.com/activity/images/original/9a317452-cf5d-4db7-abf8-fe4eb1a7ab84-istock-511100450.jpg?ch=DPR&dpr=2.625&w=1200&h=800&s=0940bfe2118700edb684dde253bd75da',
49.457778, 11.075833),
('Neuschwanstein Castle', 'Schwangau',
'Neuschwanstein Castle was commenced by the Bavarian King Ludwig II in 1869 and never completed. He saw it as a monument to medieval culture 
and kingship, which he revered and wanted to imitate. Built and furnished in medieval styles but equipped with what at the time was the 
latest technology, it is the most famous work of historicism and the embodiment of German idealism. ',
'https://www.travelandleisure.com/thmb/umcoSMJygYyG5OIYDdBPgnrJGLc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/01-neuschwanstein-castle-bavaria-NEUSCHWANSTEIN0417-273a040698f24fc1ac22e717bb3f1f0c.jpg',
47.5575, 10.749444),
('Würzburg Residence ', 'Würzburg',
'The former residence of the Würzburg prince-bishops is one of the most important baroque palaces in Europe and today it is on UNESCO World
Heritage list. Originally designed for Prince-Bishop Johann Philipp Franz von Schönborn by the then young and unknown architect Balthasar 
Neumann, it took sixty years to complete; the shell of the palace was built from 1720 to 1744 and the interior finished in 1780.',
'https://www.residenz-wuerzburg.de/bilder/residenz/suedfassade700.jpg', 49.792778, 9.938611),
('Marienberg Fortress', 'Würzburg',
'The original castle on the Marienberg, a hill which was first settled in the late Bronze Age, was probably a small fort built early in the
8th century by the Franconian-Thuringian dukes. The circular Marienkapelle is one of the oldest church buildings in South Germany and dates
from around 1000. From 1200 an unusually large castle was built, which was extended during the late Middle Ages and the Renaissance. For 
half a millennium, from around 1250 to 1720, the Marienberg was the ruling seat of the Würzburg prince-bishops.',
'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Marienberg_wuerzburg.jpg/800px-Marienberg_wuerzburg.jpg', 49.789722, 9.921389)


-- Stored procedures
-- PlannerUser
CREATE PROCEDURE [dbo].[GetAllUsers]
AS
BEGIN
	SELECT userId, username, password, firstName, lastName FROM PlannerUser ORDER BY userId
END


CREATE PROCEDURE [dbo].[GetUserById]
	@userId UNIQUEIDENTIFIER
AS
BEGIN
	SELECT userId, username, password, firstName, lastName FROM PlannerUser WHERE userId = @userId
END


CREATE PROCEDURE [dbo].[GetUserByUsername]
	@username nvarchar(50)
AS
BEGIN
	SELECT userId, username, password, firstName, lastName FROM PlannerUser WHERE username = @username
END


CREATE PROCEDURE [dbo].[CreateUser]
	@username varchar(30),
	@password varchar(30),
	@firstName varchar(30),
	@lastName varchar(30)
AS
BEGIN
	INSERT INTO PlannerUser (username, password, firstName, lastName) VALUES (@username, @password, @firstName, @lastName)
END

-- Castle

CREATE PROCEDURE [dbo].[GetAllCastles]
AS
BEGIN
SELECT castleId, name, city, description, imageUrl, latitude, longitude FROM Castle
ORDER BY castleId
END

--Visit Record

CREATE PROCEDURE [dbo].[AddRecord]
	@username varchar(30),
	@castle int, 
	@status varchar(30),
	@visitDate Date = null
AS
	BEGIN
		INSERT INTO VisitRecords(userId, castleId, visitDate, status) VALUES
		((SELECT userId FROM PlannerUser where username=@username), @castle, @visitDate, @status)
	END

CREATE PROCEDURE [dbo].[deleteRecord]
	@id int
AS
	BEGIN
	DELETE FROM VisitRecords WHERE recordId=@id
	END

	CREATE PROCEDURE [dbo].[editRecord]
	@id INT,
	@castleId INT,
	@visitDate DATE =null,
	@status VARCHAR(30)
	AS
	BEGIN
	UPDATE VisitRecords
	SET castleId=@castleId, visitDate=@visitDate, status=@status WHERE recordId=@id
	END

	CREATE PROCEDURE [dbo].[GetRecordsOfUser]
	@username VARCHAR(30)
	AS
	BEGIN	
	SELECT recordId, c.castleId, c.name, c.city, c.description, c.imageUrl, 
	 CAST(c.latitude AS FLOAT) AS latitude,CAST(c.longitude AS FLOAT) AS longitude, visitDate, addDate, status
	FROM VisitRecords vr
	INNER JOIN Castle c on vr.castleId=c.castleId
	where userId in (SELECT userId FROM PlannerUser WHERE username=@username)
	ORDER BY recordId
	END

