import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions,fetchData } from '../utils/fetchData';
 import HorizontalScrollbar from './HroizontalScrollbar'

const SearchExercises = ( setExercises, bodyPart, setBodyPart) => {
const [search, setSearch] = useState('')

const [bodyParts, setBodyParts] = useState([]);

useEffect(() => {
  const fetchExercisesData = async () => {
    const bodyPartData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList',exerciseOptions);

    setBodyParts(['all', ...bodyPartData]);
  }

  fetchExercisesData();
 
}, [])



const handleSearch = async () =>{
    if(search){
        const exercisesData=await fetchData('https://exercisedb.p.rapidapi.com/exercises',exerciseOptions);

        // console.log(exercisesData);
        const searchedExercises=exercisesData.filter(
            (exercise) => exercise.name.toLocaleLowerCase().include(search)
            || exercise.target.toLocaleLowerCase().include(search)
            || exercise.equipment.toLocaleLowerCase().include(search)
            || exercise.bodyPart.toLocaleLowerCase().include(search)
        );

        setSearch('');
        setExercises(searchedExercises);
    }
}

  return (
    <Stack alignItems="center" mt="37px"
    justifyContent="center" p="20px">
        <Typography fontWeight={700} sx={{
            fontSize: {lg: '44px', xs: '30px'}
        }} mb="50px" textAlign="center">
            Awesome Excercises You <br/> Should Know
        </Typography>
        <Box position ="relative" mb="72px">
            <TextField 
            sx={{
                input: {fontWeight: '100', border: 'none', borderRadius: '4px'},
                width:{lg: '1170px', xs: '350px'},
                backgroundColor:"#fff",
                borderRadius: '40px]'
            }}
                height="76px"
                value={search}
                onChange={(e)=>setSearch(e.target.value.toLocaleLowerCase())}
                placeholder="Search Exercises"
                type="Text"
            />
            <Button className="search-btn"
            sx={{
                bgcolor:'#FF2625',
                color: '#fff',
                textTransform: 'none',
                width: { lg: '175px', xs: '80px' },
                fontSize: { lg: '20px', xs: '14px'},
                height: '56px',
                position: "absolute",
                right: '0'

            }} onClick={handleSearch}>
                Search
            </Button>
        </Box>
        <Box sx={{ position: 'relative', width: '100%', p: '20px'}}>
            <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart}/>
        </Box>
    </Stack>
  )
}

export default SearchExercises