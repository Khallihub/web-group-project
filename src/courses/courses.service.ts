import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CourseDto } from './courseDto';

@Injectable()
export class CoursesService {
    constructor (private prisma: PrismaService) {}
    
    async addCourse(dto: CourseDto) {
        const course = await this.prisma.course.create({
            data: {
                CourseName: dto.CourseName,
                CourseDescription: dto.CourseDescription,
            }
        })
        return course
    }
    async addTopic(dto: CourseDto) {
        const courseId = await this.getCourseId(dto)
        const topic = await this.prisma.topics.create({
            data: {
                TopicName: dto.TopicName,
                content: dto.content,
                videoTranscript:  dto.videoTranscript,
                video: dto.video,
                audio: dto.audio,
                courseId: courseId,
            }
        })
        return topic
    }

    async getAllCourses() {
        const coursesList = await this.prisma.course.findMany()
        return coursesList
    }   
    
    async getAllTopics(dto: CourseDto) {
        const courseId = await this.getCourseId(dto)
        const topicsList = await this.prisma.topics.findMany({
            where: {
                courseId: courseId
            }
        })
        return topicsList
    }
    
    async updateCourse(dto: CourseDto) { 
        const courseId = await this.getCourseId(dto)
        const updatedCourse = await this.prisma.course.update({
            where: {
                id: courseId
            },
            data: {
                CourseName: dto.newCourseName,
                CourseDescription: dto.CourseDescription,
            }

        })
        return updatedCourse
    }

    async updateTopic(dto: CourseDto) {
        const topicId = await this.getTopicId(dto)
        console.log(topicId)
        const updatedTopic = await this.prisma.topics.update({
            where: {
                id: topicId
            },
            data: {
                TopicName: dto.newTopicName,
                content: dto.content,
                videoTranscript: dto.videoTranscript,
                video: dto.video,
                audio: dto.audio,
            }
        })
        return updatedTopic
    }

    async deleteCourse(dto: CourseDto) { 
        const courseId = await this.getCourseId(dto)
        const delTopic = await this.deleteTopics(dto)
        console.log(courseId)
        const res =  await this.prisma.course.delete({
            where: {
                id: courseId
            }
        })
        return res
    }
    async deleteTopic(dto: CourseDto) {
        const topicId = await this.getTopicId(dto)
        const res = await this.prisma.topics.delete({
            where: {
                id:  topicId
            }
        })
    }

    async deleteTopics(dto: CourseDto) {
        const courseId = await this.getCourseId(dto)
        const res = await this.prisma.topics.deleteMany({
            where: {
                courseId: courseId
            }
        })
    }

    async getCourseId(dto: CourseDto) {
        const query = dto.CourseName
        const courseId = await this.prisma.course.findUnique({
            where: {
                CourseName: query
            }
        })
        return courseId.id
    }
    async getTopicId(dto: CourseDto) {
        const query = dto.TopicName
        const topicId = await this.prisma.topics.findFirstOrThrow({
            where: {
                TopicName: query,
            }
        })
        return topicId.id
    }
    
}
