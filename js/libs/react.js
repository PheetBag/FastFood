/*
A react context group all reactive under a same behavior, so reaction is defined in the context an not in the reactive object.
*/

//This is the master function for react, so it will allow us to setup a reactTree an interact with it in a jquery like method.
function react(reactionary = 'click'){

    let reactTree = new ReactTree(); 
    reactTree.set(reactionary); 
    return reactTree;
}

//This is a function designed to allow the creaction of reactive Objects with an jquery like syntax
function reactive(reactionary = 'inherit'){

    let reactive = new Reactive(); 
    reactive.set(reactionary); 
    return reactive; 

    console.log('lalalal');
    
}

function ReactTree(){

    this.list = []; 
    this.reactionary; 
    this.reactionInherit = false; 

    this.reaction = function(reactive){
        console.info('triggered reaction ' + 'in: %o',reactive.context);
    }

    this.append = function(reactive){

        //inherit reactionary
        if(reactive.reactionary == 'inherit'){ 
            reactive.set(this.reactionary);
        }

        reactive.context.addEventListener(reactive.reactionary, () =>{

            //we inherit the reaction from the reactTree is reactionInherit is true in the reactive
            if(reactive.reactionInherit == true){
                this.reaction(reactive); 
            }

            if(reactive.reaction != null){ 
                reactive.reaction(reactive); 
            }
        }); 

        return(this.list.push(reactive) - 1);
    }

    this.set = function(reactionary){

        this.reactionary = reactionary; 
        return this;
    }

    this.do = function(reaction = ()=>{}){

        this.reaction = reaction; 
        return this; 
    }

}

function Reactive(){

    this.context = paint.getContext('windowCanvas', 'id')[0]; 
    this.reactionary; 
    this.reaction = null; 
    this.reactionInherit = false; 

    this.set = function(reactionary){

        this.reactionary = reactionary; 
        return this;
    }

    this.do = function(reaction, forceInheritance = false){

        this.reactionInherit = forceInheritance; 
        this.reaction = reaction; 
        return this; 
    }

    this.use = function(context){

        this.context = context;
        return this;
    }

    this.add = function(reactTree){

        //this take the reactTree and use its append method, sending the object inself as param
        reactTree.append(this);
        return this; 
    }
}
