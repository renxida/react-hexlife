/*eslint no-undef: "warn"*/
// LIFE RELATED
const createArray = function(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    } else {
    	arr.fill(false);
    }

    return arr;
}

const advanceGeneration = function(biomap){
    const survival_condition = [0,3,4,5];
/* Grid Structure:
 * <- O O
 *  O O O
 *  O O ->
 *
 *  * - x - >
 *  |
 *  y
 *  |
 *  v
*/
    const gridHeight = biomap.length;
    const gridWidth  = biomap[0].length;

    const new_biomap = createArray(gridHeight, gridWidth);

    const my_mod = function(n, d){
        const rem = n%d;
        return rem >= 0 ? rem : d+rem;
    }

    const neighbor_offsets = [
        [ 0, -1],
        [ 1, -1],
        [-1,  0],
        [ 1,  0],
        [ -1, 1],
        [ 0,  1],
    ]

    for(let x=0; x<gridWidth; x++){
        for(let y=0; y<gridHeight; y++){
            let get_neighbor_state = function([offsetX, offsetY]){
                let nX = my_mod(x+offsetX, gridWidth);
                let nY = my_mod(y+offsetY, gridHeight);
                return biomap[nY][nX];
            }
            let neighbor_count = neighbor_offsets.map(
                         get_neighbor_state
                    ).reduce(
                        (a, b) => a+b
                    );
            new_biomap[y][x] = survival_condition.includes(neighbor_count);
        }
    }
    return new_biomap;
}

function* HexlifeGenerator(gridWidth, gridHeight, initialState) {
    if(!initialState){
        initialState = createArray(gridHeight, gridWidth);
        initialState.map((row) => row.fill(false));
        initialState[Math.floor(gridHeight/2)][Math.floor(gridWidth/2)] = true;
    }
    let biomap = initialState;
    console.log('biomap init: ', biomap)
    while(1){
        yield biomap;
        console.log(biomap);
        biomap = advanceGeneration(biomap);
    }
}

export default HexlifeGenerator;
