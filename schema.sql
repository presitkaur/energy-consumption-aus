CREATE TABLE "energy" (
    "location" varchar(15),
    "industry" varchar(250),
    "fuels_consumed" varchar(250),
    "date" varchar,
    "value" float
);

CREATE TABLE "population" (
    "date" varchar,
    "location" varchar(15),
    "population" float,
    "GDP" float ,
    "energy_consumption" float ,
    "GSP" float
);

-- CREATE TABLE "energy" (
--     "location" varchar(15)   NOT NULL,
--     "industry" varchar(250)   NOT NULL,
--     "fuels_consumed" varchar(250)   NOT NULL,
--     "date" varchar   NOT NULL,
--     "value" float   NOT NULL,
--     CONSTRAINT "pk_energy" PRIMARY KEY (
--         "location"
--      )
-- );

-- CREATE TABLE "population" (
--     "date" varchar   NOT NULL,
--     "location" varchar(15)   NOT NULL,
--     "population" float   NOT NULL,
--     "GDP" float   NOT NULL,
--     "energy_consumption" float   NOT NULL,
--     "GSP" float   NOT NULL
-- );

-- ALTER TABLE "population" ADD CONSTRAINT "fk_population_location" FOREIGN KEY("location")
-- REFERENCES "energy" ("location");



-- SELECT
-- location, industry,date,fuels_consumed,value
-- FROM energy where industry like '%Mining%' and location like '%aus%' and date like '%2000-01'
-- 	GROUP BY location, industry,date,fuels_consumed,value
-- 	ORDER BY
-- 	date asc
-- ;
