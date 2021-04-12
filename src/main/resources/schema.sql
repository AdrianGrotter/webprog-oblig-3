CREATE TABLE Billett (
    film VARCHAR (255) NOT NULL,
    antall VARCHAR (255) NOT NULL,
    fornavn VARCHAR (255) NOT NULL,
    etternavn VARCHAR (255) NOT NULL,
    telefonnr VARCHAR (255) NOT NULL,
    epost VARCHAR (255) NOT NULL
);

CREATE TABLE Film (
    tittel VARCHAR (255) NOT NULL
);

INSERT INTO Film (tittel)
VALUES ('Pulp Fiction'),
('Fight Club'),
('Inception'),
('Once Upon A Time In Hollywood'),
('Børning 2'),
('Æresdrap');