import { Injectable, Service } from '@angular/core';



export interface NewsItem {
    id: number;
    title: string;
    description: string;
    date: string;
    image: string;
}

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private newsItem: NewsItem[] = [
        {
            id: 1,
            title: 'Sport 2026',
            description: 'Students playing happily in our playground!',
            image: 'https://scontent.fmpm5-1.fna.fbcdn.net/v/t39.30808-6/777515673_122150039163067884_4270117047083304482_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x853&ctp=s1280x853&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFuXxx3evAcxXP2PO4ESk9zAlwwlIqmrTECXDCUiqatMUxNIp0oa7VlV1FAmzZF7LGIhSutXXQ0Eb0hrVVuz6WQ&_nc_ohc=P5xqnU0kGckQ7kNvwFoER-1&_nc_oc=Adp_jKPS8ntLMvTvfvCMvdUp4SFvlM5GzjRIoCLPlkbFEjgH0w-zpgaj6HMEC39VNag&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fmpm5-1.fna&_nc_gid=hhondsnyR9B3A-EJcRjtLA&_nc_ss=7f2a8&oh=00_AQG8ylcwJ8mO1M8XJ2ECdrGUhODTOyyVWRg3eYbckZhJLQ&oe=6A9519BD',
            date: '10 March 2026'
        },
        {
            id: 2,
            title: 'Computer Science',
            description: 'Student havin fun having ICT',
            date: '25 June 2026',
            image: 'https://scontent.fmpm5-1.fna.fbcdn.net/v/t39.30808-6/777478940_122150039289067884_6032457035965652834_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1365&ctp=s2048x1365&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEtltXwv8jyglzh4xye2KviFGUa8q5KUzIUZRryrkpTMsZb43eN5KguD44S8uK3NBvq3IYLYCuSaIJlvihxQbcc&_nc_ohc=l-_AencvH9cQ7kNvwH0eHYu&_nc_oc=AdoYSbX8rGlxXJ0LZHJsbHdDzDRS2YkUoobELi4SpotMQ-ZlrATSF7ZsbETsfANzVOU&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fmpm5-1.fna&_nc_gid=vtoCHQSczif51xbrjud0-g&_nc_ss=7f2a8&oh=00_AQF6WWqkvjJGZiuJVAK7At7uQDXPIxjzGSqSTNWXfWPlnA&oe=6A952490'
        },
        {
            id: 3,
            title: 'Study Time',
            description: 'Student Studying at Estrela do Indico',
            date: '30 June 2026',
            image: 'https://scontent.fmpm5-1.fna.fbcdn.net/v/t39.30808-6/777478940_122150039289067884_6032457035965652834_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1365&ctp=s2048x1365&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEtltXwv8jyglzh4xye2KviFGUa8q5KUzIUZRryrkpTMsZb43eN5KguD44S8uK3NBvq3IYLYCuSaIJlvihxQbcc&_nc_ohc=l-_AencvH9cQ7kNvwH0eHYu&_nc_oc=AdoYSbX8rGlxXJ0LZHJsbHdDzDRS2YkUoobELi4SpotMQ-ZlrATSF7ZsbETsfANzVOU&_nc_pt=5&_nc_zt=23&_nc_ht=scontent.fmpm5-1.fna&_nc_gid=vtoCHQSczif51xbrjud0-g&_nc_ss=7f2a8&oh=00_AQF6WWqkvjJGZiuJVAK7At7uQDXPIxjzGSqSTNWXfWPlnA&oe=6A952490'
        },
        {
            id: 4,
            title: 'Cambridge Results',
            description: 'Excellent results in Cambridge International Examinations',
            date: 'March 5, 2026',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80'
        },
        {
            id: 5,
            title: 'Teacher Training',
            description: 'Staff development workshop on modern teaching methods',
            date: 'March 1, 2026',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80'
        },
        {
            id: 6,
            title: 'Student Achievement',
            description: 'Grade 6 student wins National Mathematics Olympiad',
            date: 'February 28, 2026',
            image: 'https://images.unsplash.com/photo-1577720643272-265e434a0834?w=400&q=80'
        }
    ]

    constructor() { }
    getNews(): NewsItem[] {
        return this.newsItem;
    }
    getNewsById(id: number): NewsItem | undefined {
        return this.newsItem.find(item=>item.id===id);
    }

    addNews(item:NewsItem):void{
        item.id=Math.max(...this.newsItem.map(n=>n.id), 0)+1;
        this.newsItem.unshift(item)
    }

}

