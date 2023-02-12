import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CourseDto } from './courseDto';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
    constructor(private course: CoursesService) { }

    @Post('addCourse')
    addCourse(@Body() details: {name: string, desc: string}) {
        let dto = new CourseDto();
        dto.CourseName = details.name;
        dto.CourseDescription = details.desc;  
        return this.course.addCourse(dto)
    }
    
    @Post('addTopic')
    addTopic(@Body() details: {
        courseName: string,
        title: string,
        content: string,
        videoUrl: string,
        audioUrl: string,
        videoTranscript: string}) {
            let dto = new CourseDto();
            dto.TopicName = details.courseName;
            dto.CourseName = details.courseName;
            dto.audio = details.audioUrl;
            dto.content = details.content;
            dto.video = details.videoUrl;
            dto.videoTranscript = details.videoTranscript;
            console.log(details.content) 
            return this.course.addTopic(dto)
    }

    @Get('allCourses')
    getAllCourses() {
        return this.course.getAllCourses()  
    }

    @Post('allTopics')
    getAllTopics(@Body() details: { CourseName: string }) {
        let dto = new CourseDto()
        dto.CourseName = details.CourseName
        return this.course.getAllTopics(dto)
    }

    @Patch('updateCourse')
    updateCourse(@Body() details: {id: string, newName:string, newDesc: string}) {
        let dto = new CourseDto();
        dto.CourseName = details.id;
        dto.newCourseName =  details.newName;
        dto.CourseDescription = details.newDesc;
        console.log(dto)    
        return this.course.updateCourse(dto)
    }

    @Patch('updateTopic')
    updateTopic(@Body() dto: CourseDto) {
        return this.course.updateTopic(dto)
    }

    @Delete('deleteCourse')
    deleteCourse(@Body() details: {name: string}) {
        let dto = new CourseDto();
        dto.CourseName = details.name;
        return this.course.deleteCourse(dto)
    }

    @Delete('deleteTopic')
    deleteTopic(@Body() dto: CourseDto) {
        return this.course.deleteTopic(dto)
    }
  
    @Delete('deleteTopics')
    deleteTopics(@Body() dto: CourseDto) {
        return this.course.deleteTopics(dto)
    }
    @Get("getID")
    getCourseId(@Body() dto: CourseDto) {
        return this.course.getCourseId(dto)
    }

    @Get("getID2")
    getTopicId(@Body() dto: CourseDto) {
        return this.course.getTopicId(dto)
    }
    
}
