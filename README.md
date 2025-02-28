## Yleistä

Visualisoi pääkaupunkiseudun ajallista saavutettavuutta julkisella liikenteellä. Sivusto käyttää Digital Geography Labin saavutettavuus- ja liikkumistutkimuskeskuksen keräämää dataa.

## Hosting

1. Lataa YKRGrid ja matka-aika-aineisto projektin juureen

```
wget -O YKRGrid.zip https://zenodo.org/record/3247564/files/MetropAccess_YKR_grid.zip?download=1
wget -O 2018.zip https://zenodo.org/record/3247564/files/HelsinkiRegion_TravelTimeMatrix2018.zip?download=1
```

2. Pura 2018.zip ja nimeä purettu kansio `TravelTimeMatrix`
3. Siirrä `TravelTimeMatrix` ja `YKR_Grid.zip` alakansioon `data`

> [!NOTE]  
> Purettu matka-aika-aineisto vie noin 15-20 GB tallennustilaa

## Docker Hosting

Voit käyttää sovellusta myös Dockerin avulla:

1. Varmista, että Docker ja Docker Compose on asennettu järjestelmääsi
2. Lataa ja valmistele data-kansio kuten yllä on kuvattu
3. Rakenna ja käynnistä sovellus Docker Composella:

```bash
cp docker-compose.example.yml docker-compose.yml
docker-compose up
```

Sovellus on nyt käytettävissä osoitteessa http://localhost:3000

Voit pysäyttää sovelluksen komennolla:

```bash
docker-compose down
```

### Docker-konfiguraatio

Data-kansio on määritetty volume-mountiksi, joten voit päivittää data-tiedostoja ilman kontin uudelleenrakentamista.

## Viitteet

https://blogs.helsinki.fi/saavutettavuus/

Datan/menetelmien kuvaus: Toivonen, T., M. Salonen, H. Tenkanen, P. Saarsalmi, T. Jaakkola & J. Järvi (2014). Joukkoliikenteellä, autolla ja kävellen: Avoin saavutettavuusaineisto pääkaupunkiseudulla. Terra 126: 3, 127-136.

Datan DOI-tunniste: Tenkanen, H., J.L. Espinosa, E. Willberg, V. Heikinheimo, A. Tarnanen, T. Jaakkola, J. Järvi, M. Salonen, T. Toivonen (2018). Helsinki Region Travel Time Matrix 2018. DOI: 10.13140/RG.2.2.20858.39362

—————————————————————————————————–
LISENSSI
—————————————————————————————————–
Pääkaupunkiseudun-Matka-aikamatriisi, jonka tekijä on MetropAccess-hanke / Accessibility Research Group (Helsingin Yliopisto) on lisensoitu Creative Commons Nimeä 4.0 Kansainvälinen -lisenssillä. Lisätietoa lisenssistä: http://creativecommons.org/licenses/by/4.0/deed.fi

Visualisaation ohjelmistolähdekoodi, jonka tekijä on Max Kalhama on lisensoitu Creative Commons Nimeä 4.0 Kansainvälinen -lisenssillä
