package oblig.webprog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@RestController
public class billettController {

    @Autowired
    billettRepository rep;

    @PostMapping("/lagreData")
    public void registrerBillett(Billett enBillett){
        rep.lagreBillett(enBillett);
    }
    @GetMapping("/hentData")
    public List<Billett> hentData(String verdi){

        List<Billett> billetter = rep.hentBilletter();

        if (verdi.equals("Filmtittel")){
            Collections.sort(billetter, new Comparator<Billett>() {
                @Override
                public int compare(Billett b1, Billett b2) {
                    if (b1.getFilm() != b2.getFilm()) {
                        return b1.getFilm().compareTo(b2.getFilm());
                    }
                    return b1.getFornavn().compareTo(b2.getFornavn());
                }
            });
        }else if (verdi.equals("Fornavn")){
            Collections.sort(billetter, new Comparator<Billett>() {
                @Override
                public int compare(Billett b1, Billett b2) {
                    return b1.getFornavn().compareTo(b2.getFornavn());
                }
            });
        }else if (verdi.equals("Etternavn")){
            Collections.sort(billetter, new Comparator<Billett>() {
                @Override
                public int compare(Billett b1, Billett b2) {
                    return b1.getEtternavn().compareTo(b2.getEtternavn());
                }
            });
        }else if (verdi.equals("Antall")){
            Collections.sort(billetter, new Comparator<Billett>() {
                @Override
                public int compare(Billett b1, Billett b2) {
                    return b2.getAntall() - b1.getAntall();
                }
            });
        }else{
            System.out.print("Error: "+verdi+"\n");
        }

        return billetter;
    }

    @GetMapping("/slettData")
    public void slettData(){
        rep.slettBilletter();
    }

    @GetMapping("/hentFilmer")
    public List<Film> hentFilmer(){
        return rep.hentFilmer();
    }

    @GetMapping("/slettBillett")
    public void slettBillett(int telefonnr){
        rep.slettBillett(telefonnr);
    }
}