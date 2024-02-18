const url = ('https://collectionapi.metmuseum.org/public/collection/v1/objects/');


function getArt(){
   
    function getNewObject() {
        let objId = Math.floor(Math.random()*487000);
        let objLink = url + objId;
        console.log(objLink);
        fetch(objLink)
        .then(objectData => objectData.json())
        .then(objectInfo => {
            console.log(objectInfo);

            if (!objectInfo.primaryImageSmall || objectInfo.message === "ObjectID not found"){
                console.log("No image... getting new object.");
                getNewObject();
            } else {

                let imageSmall = objectInfo.primaryImageSmall;
                let imagePrimary = objectInfo.primaryImage;
                let title = objectInfo.title;
                console.log(title);
                let artist = objectInfo.artistDisplayName;

                let objectURL = objectInfo.objectURL;

                const img = new Image();
                img.src = objectInfo.primaryImage;

                img.onload = function(){
                    const width = this.width;
                    const height = this.height;

                // Log the dimensions
                console.log('Width:', width);
                console.log('Height:', height);

                let imgHeight = this.height;
                let imgWidth = this.width;
                if(imgHeight >= 750 || imgWidth >= 500){
                    // img.src = objectInfo.primaryImageSmall;
                    document.getElementById('image').innerHTML = `<img src="${imageSmall}" />`
                    document.getElementById('imageButton').innerHTML = `<a href="${imagePrimary}" target="_blank"><p>Click here for larger/zoomable version</a>`
                } else {
                    document.getElementById('image').innerHTML = `<img src="${imagePrimary}" />`;
                    document.getElementById('imageButton').innerHTML = "";
                }
                }

                
                if(!artist || artist === "" || artist === "null"){
                    artist = "No artist information available."
                } 

                let date = objectInfo.objectDate;
                if(!date || date === "" || date === "null"){
                    date = "No date available."
                }

                let origin = objectInfo.culture;
                if(!origin || origin === "" || origin === "null"){
                    origin = "Unknown."
                }

                let source = objectInfo.creditLine;
                if(!source || source === "" || source === "null"){
                    source = "Unknown."
                }

                let medium = objectInfo.medium;
                if(!medium || medium === "" || medium === "null"){
                    medium = "Unknown."
                }

                let accession = objectInfo.accession;
                if(!accession || accession === "" || accession === "null"){
                    accession = ""
                }

                let dimensions = objectInfo.dimensions;
                if(!dimensions || dimensions === "" || dimensions === "null"){
                    dimensions = ""
                }

                let country = objectInfo.country;
                if(!country || country === "" || country ==="null"){
                    country="";
                }

                
                document.getElementById('title').innerHTML = `<p>${title} (${date})</br>${artist}</p>`;

                document.getElementById('infoHolder').innerHTML = `<h2>WELCOME TO THE MET</h2><p>This website displays a random image from the digital archive of the Metropolitan Museum of Art. Some images may be NSFW or minors.<p>Built by Bill Kowalski of <a href="https://mahonebaywebdesign.com">Mahone Bay Web Design</a>.<H2>ITEM DETAILS</h2><p><strong>TITLE:</strong> ${title}</p><p><strong>ARTIST:</strong> ${artist}</p><p><strong>DATE:</strong> ${date}</p><p><strong>COUNTRY:</strong> ${country}</p><p><strong>ORIGIN: </strong>${origin}</p><p><strong>MEDIUM: </strong>${medium}</p><p><strong>SOURCE:</strong> ${source}</p><p><strong>DIMENSIONS:</strong> ${dimensions}</p><p><strong>OBJECT ID:</strong> <a target="_blank" href="https://www.metmuseum.org/art/collection/search/${objId}">${objId}</a>`;
                
            }
            })
        }
    
        getNewObject();
    
    };


getArt();
