'use strict';

(function(){
    let iceCreamList;
    let resultArea;

    document.addEventListener('DOMContentLoaded', init);

    async function init(){
        iceCreamList = document.getElementById('iceCreamList');
        resultArea = document.getElementById('resultArea');
        try{
            const data = await fetch ('/icecreams');
            const flavors = await data.json();
            populateIceCreamList(flavors);
        }
        catch(err){
            showErrorMessage(err.message);
        }    
    }

    function populateIceCreamList(queryResult){
        if(!queryResult || queryResult.message){
            showErrorMessage('Sorry something went wrong');
        }
        else {
            for (let flavor of queryResult){
                const option = document.createElement('option');
                option.value = flavor;
                option.textContent= flavor;
                iceCreamList.appendChild(option);
            }
            iceCreamList.addEventListener('change', choose);
            iceCreamList.value ='';
        }
    }//end of populateIceCreamList

    async function choose(){
        const iceCreamFlavor = iceCreamList.value;
        if(iceCreamFlavor.length>0){
            try {
                const data = await fetch(`/icecreams/${iceCreamFlavor}`);
                const result = await data.json();
                updateResult(result);
            }
            catch(err){
                showErrorMessage(err.message);
            }
        }
        else{
            clearResultarea();
        }
    } // end of choose
    
    
    function clearResultarea(){
        resultArea.innerHTML='';
    }

    function updateResult(data){
        if(!data){
            showErrorMessage('Programming error, Sorry!')
        }
        else if(data.message){
            showErrorMessage(data.message)
        }
        else if(data.name && data.name.length===0){
            clearResultarea();
        }
        else{
            let htmlString = `
            <div id="icecream">
                <p id="name">Icecream: ${data.name} </p>
                <p id="price"> price: ${data.price} €</p>
                <button type="submit" value="submit">+</button>
                </div>
                
              `;
                if (data.image && data.image.length>0){
                    htmlString+=`<img src ="/images/${data.image}"/>
                    `;
                }
                
                resultArea.innerHTML=htmlString;
        }
    } // end of updateResult

   function  showErrorMessage(message){
        resultArea.innerHTML=`
        <div class="error"> 
        <h2>Error</h2>
        <p>${message}</p>
         </div>`;
        
    }

})();