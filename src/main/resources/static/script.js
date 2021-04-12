$(function(){
    hentFilmer();
    hentAlle();
});
function kjopBillett(){
    //resetter feilmeldinger
    feilAntall.innerHTML = "";
    feilFornavn.innerHTML = "";
    feilEtternavn.innerHTML = "";
    feilTelefonnr.innerHTML = "";
    feilEpost.innerHTML = "";

    //Kode for å se om det er tomme felter
    let error = false;
    if (!inpAntall.value === ""){
        feilAntall.innerHTML =  "Feltet er tomt!";
        error = true;
    }else if(!$.isNumeric($("#inpAntall").val())){
        feilAntall.innerHTML =  "Fyll inn et tall!";
        error = true;
    }if(inpFornavn.value === ""){
        feilFornavn.innerHTML =  "Feltet er tomt!";
        error = true;
    }if(inpEtternavn.value === ""){
        feilEtternavn.innerHTML =  "Feltet er tomt!";
        error = true;
    }if(inpTelefonnr.value === ""){
        feilTelefonnr.innerHTML =  "Feltet er tomt!";
        error = true;
    }else if(!$.isNumeric($("#inpTelefonnr").val())) {
        feilTelefonnr.innerHTML = "Fyll inn et tall!";
        error = true;
    }if(inpEpost.value === ""){
        feilEpost.innerHTML =  "Feltet er tomt!";
        error = true;
    }if (!error){
        const enBillett = {
            film: $("#filmer").val(),
            antall: $("#inpAntall").val(),
            fornavn: $("#inpFornavn").val(),
            etternavn: $("#inpEtternavn").val(),
            telefonnr: $("#inpTelefonnr").val(),
            epost: $("#inpEpost").val()
        };

        //Kode for å tømme inputfeltene
        inpAntall.value = "";
        inpFornavn.value = "";
        inpEtternavn.value = "";
        inpTelefonnr.value = "";
        inpEpost.value = "";

        //Sender objektet over til server og kaller en funksjon for å hente all data
        $.post("/lagreData", enBillett, function(){
            hentAlle();
        });
    }
}

//Henter all data og kaller en funksjon for å formatere dataen
function hentAlle(){
    let verdi = $("#sortering").val();
    $.get("/hentData/?verdi="+verdi, function(data){
        formaterData(data);
    });
}

//Formaterer dataen og skriver den ut
function formaterData(data){
    let ut = "<table class='table table-striped text-white'><tr>" +
        "<td>Film</td><td>Antall</td><td>Fornavn</td><td>Etternavn</td><td>Telefonnr</td><td>Epost</td><td>Slett</td>" +
        "</tr>";
    for (let i = 0; i<data.length; i++){
        ut += "<tr>" +
            "<td>"+data[i].film+"</td><td>"+data[i].antall+"</td><td>"+data[i].fornavn+"</td>" +
            "<td>"+data[i].etternavn+"</td><td>"+data[i].telefonnr+"</td><td>"+data[i].epost+"</td><td><button value='"+data[i].telefonnr+"' onclick='slettBillett(this.value)' class='btn btn-danger'>Slett</button></td>" +
            "</tr>";
    }
    document.getElementById("ut").innerHTML = ut;
}

//Sletter dataen på serveren
function slettData(){
    $.get("/slettData", function(){
        hentAlle();
    });
}

function hentFilmer(){
    $.get("/hentFilmer", function(data){
        let ut = "<select name='filmer' id='filmer' class='form-select'>"
        for (const film of data){
            ut += "<option value=\""+film.tittel+"\">"+film.tittel+"</option>"
        }
        ut += "</select>";
        $("#ddl").html(ut);

    });
}
function slettBillett(telefonnr){
    $.get("/slettBillett/?telefonnr="+telefonnr, function(){
        hentAlle();
    });
}