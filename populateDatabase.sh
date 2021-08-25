wget -O YKRGrid.zip https://zenodo.org/record/3247564/files/MetropAccess_YKR_grid.zip?download=1
mkdir data
cd data
wget -O 2018.zip https://zenodo.org/record/3247564/files/HelsinkiRegion_TravelTimeMatrix2018.zip?download=1
unzip 2018.zip
cd ..
NODE_ENV=production node build/populateDatabase.js