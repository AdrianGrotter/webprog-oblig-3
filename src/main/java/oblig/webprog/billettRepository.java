package oblig.webprog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class billettRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreBillett(Billett billett){
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, billett.getFilm(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTelefonnr(), billett.getEpost());
    }

    public List<Billett> hentBilletter(){
        String sql = "SELECT * FROM Billett";
        List<Billett> billetter = db.query(sql, new BeanPropertyRowMapper(Billett.class));
        return billetter;
    }
    public void slettBilletter(){
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }

    public List<Film> hentFilmer(){
        String sql = "SELECT * FROM Film";
        List<Film> filmer = db.query(sql, new BeanPropertyRowMapper(Film.class));
        return filmer;
    }
    public void slettBillett(int telefonnr){
        String sql = "DELETE FROM Billett WHERE telefonnr LIKE '"+telefonnr+"'";
        db.update(sql);
    }
}
