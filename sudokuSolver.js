// const GRID = [
//     [5,1,3,4,0,0,0,2,6],
//     [0,0,4,7,5,2,0,1,0],
//     [0,7,0,3,1,6,0,9,5],
//     [0,6,9,0,3,8,0,0,1],
//     [2,0,1,5,0,0,0,6,3],
//     [7,3,5,0,9,1,0,0,0],
//     [0,0,6,0,7,0,0,0,0],
//     [0,0,0,0,0,4,0,0,0],
//     [3,0,0,0,0,0,2,0,9]
// ]

const GRID = [
    [8,3,0,4,0,5,0,2,0,],
    [9,0,0,7,0,0,0,5,8,],
    [1,5,6,0,2,0,3,0,0,],
    [0,0,8,0,7,2,5,0,0,],
    [7,0,5,0,3,0,6,0,0,],
    [0,6,0,0,4,9,8,0,2,],
    [2,0,0,0,0,0,4,6,9,],
    [0,0,0,0,8,4,7,0,0,],
    [5,0,4,0,0,0,0,8,1,],
]

// Attempt to make it works on 4x4, 9x9, and 16x16 Suduku 
const SUBGRIDSIZE = Math.sqrt(GRID.length)

// Simple immutable splice, does not have add/remove functionality
const simpleSplice = (arr,start,howmany)=>{
    return arr.slice(start,start+howmany)
}

const isValid = (grid,r,c,value)=> {
    //  If in the row
    if (grid[r].includes(value)) return false
    // If in the Column
    if (grid.find(row=>row[c]===value)) return false

    // Check whether it is in the sub-gridfirst filter the rows
    // Get which section of the grid is it in, eg row 0, col 5 will be in the 0 row section and 1 col section. 
    let rowSection = Math.floor(r/SUBGRIDSIZE)
    let colSection = Math.floor(c/SUBGRIDSIZE)
    
    // There are a lot of ways to do it, my default approach would be using Array.filter, however, in this case does not feels approcate, 
    // My secondary option would array.slice(start,end), but I find it slightly hard to read with all the variables names, hence,
    // Created a custom splice function since the default one mutate the array, created a helper function for it.
    // Arguable creating variables might be better for performance while maintaining readability.
    // Input array,start and howmany to select.
    let subGrid = simpleSplice(grid,rowSection*SUBGRIDSIZE,SUBGRIDSIZE)
        .map(subRow=>simpleSplice(subRow,colSection*SUBGRIDSIZE,SUBGRIDSIZE))
    // Now check if it is in the section, use es2019, Array.flat()
    if (subGrid.flat().includes(value)) return false
    // Did not validate any constraint, so is valid.
    return true
} 

// Recursive Function to attempt to solve  it, default start at position 0,0
const solve = (grid, r= 0 , c = 0) =>{
    // If successfully loop to the last one, return the true
    if(r === GRID.length) {
        console.log(JSON.stringify(grid))
        return true
    } 
    // If column is the last column, go to next row
    if(c === GRID.length) return solve(grid,r+1,0)
    // If the current cell have value, go to next cell
    if(GRID[r][c] !== 0) return solve(grid,r,c+1)

    // If all basic condition met, bruteforce the value
    for(let val = 1; val<GRID.length+1; val++){
        // If not valid number can be input to the cell, 
        if(isValid(grid,r,c,val)){
            grid[r][c] = val
            // If recursively return true, feed back to true
            if (solve(grid,r,c+1)) return true
            // If it is wrong, loop to next value
            grid[r][c] = 0
        }
    }
    // If all value fail, reset to previously bruteforcing value. 
    return false
}

solve(GRID)





