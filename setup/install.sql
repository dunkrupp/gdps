-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
--                                                                            --
--                               sqlite3                                      --
--                                                                            --
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

-- This file is just for reference of the installed Schema in a more readable format.

-- table
CREATE TABLE offenders (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    name text NOT NULL,
    alliance text DEFAULT NULL,
    created_at datetime NOT NULL DEFAULT current_timestamp,
    updated_at datetime NOT NULL DEFAULT current_timestamp,
    deleted_at datetime
);

CREATE TABLE citations (
    id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    offender_id integer NOT NULL,
    note text DEFAULT NULL,
    created_at datetime NOT NULL DEFAULT current_timestamp,
    updated_at datetime NOT NULL DEFAULT current_timestamp,
    deleted_at datetime,
    FOREIGN KEY (offender_id)
        REFERENCES offenders (id)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
);


-- index name
CREATE UNIQUE INDEX idx_offenders_name
    ON offenders (name ASC)
    WHERE deleted_at IS NULL;

-- trigger (updated_at)
CREATE TRIGGER tg_offenders_updated_at
    AFTER UPDATE
    ON offenders FOR EACH ROW
    BEGIN
        UPDATE offenders SET updated_at = current_timestamp
            WHERE id = old.id
END;

-- trigger (updated_at)
CREATE TRIGGER tg_citations_updated_at
    AFTER UPDATE
    ON citations FOR EACH ROW
    BEGIN
        UPDATE citations SET updated_at = current_timestamp
            WHERE id = old.id
END;