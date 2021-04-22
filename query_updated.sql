-- Query to check data load 
select * from energy;

select * from population;


SELECT
location, industry,date,fuels_consumed,value
FROM energy where industry like '%Agriculture%' and location like '%aus%' and date like '%2000-01'
	GROUP BY location, industry,date,fuels_consumed,value
	ORDER BY
	date asc
;

SELECT
location, population, date, energy_consumption
FROM population where date like '%2000-01'
	GROUP BY location, population, date,energy_consumption
	ORDER BY
	date asc
;



-- create views
-- CREATE [OR REPLACE] VIEW view-name AS
--   SELECT column(s)
--   FROM table(s)
--   [WHERE condition(s)];
