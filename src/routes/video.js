const { Video } = require('../models/index');
const mongoose = require('mongoose');

const winston = require('../config/winston.js');

// This function sorts the the array elements based on the attribute that is passed in as a parameter.
// The type of the attribute has to be a string that can be cast into a Number.
const byIndex = (property) => {
    return (a,b) => {
        return (Number(a[property]) < Number(b[property])) ? -1 : (Number(a[property]) > Number(b[property])) ? 1 : 0;
    };
}

const fix = async (req, res) => {
    const courses = ["html5", "css3", "javascript", "react", "nodejs", "php"];

    try {
        // check if there is a user with that email
        const videos = await Video.find();

        if (!videos) {
            throw new Error('Problem retieving the videos.');
        }
        
        let coursesAndVideos = new Map();
        let insertManyArray = new Array();
        
        // Retieving videos for each coursing and storing them in a map.
        await courses.forEach((course) => {
            if (course){
                if (!(coursesAndVideos.has(course))) {
                    coursesAndVideos[course] = videos.filter((video) => {
                        return (video.course == course);
                    }); 
                }
                
                // sort the videos in ascending order
                coursesAndVideos[course] = coursesAndVideos[course].sort(byIndex("index"));

                // joining all the arrays of different courses to make one big array to be able to insert many
                insertManyArray = insertManyArray.concat(coursesAndVideos[course]);
            }
        });
        // Clear the video database collection so that we can insert the ordered collection
        const result = await Video.deleteMany();
        console.log(result);
        // const MONGODB_URI = "mongodb+srv://ntuthuko:D3v3l0p3R@zaioplatform-zivq7.gcp.mongodb.net/TestDB?retryWrites=true"
        // const response = await mongoose.connect(MONGODB_URI, 
        //     { 
        //         useNewUrlParser: true, 
        //         useFindAndModify: false,
        //         useCreateIndex: true,
        //     }
        // );

        // if (response){
        //     console.log(response);
        //     winston.info('Database Connection Successful');
        // }

        const sorted = await Video.insertMany(insertManyArray);
        console.log("The sorted resulting document is has the same length as INSERTMANYARRAY!!", (sorted.length == insertManyArray.length) );
 
        // return the videos
        res.send(insertManyArray);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { fix };