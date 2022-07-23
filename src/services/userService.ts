import { WatchTime } from './../models/WatchTime';
import { User } from "../models";
import { EpisodeInstance } from "../models/Episodes";
import { UserCreationAttributes } from "../models/User";

function filterLastEpisodesByCourse(episodes: EpisodeInstance[]) {
  const coursesOnList: number[] = [];

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId);
      currentList.push(episode);
      return currentList;
    }

    const episodesFromSameCourse = currentList.find(
      (ep) => ep.courseId === episode.courseId
    );

    if (episodesFromSameCourse!.order > episode.order) return currentList;

    const listWithoutEpisodeFromSameCourse = currentList.filter(ep=> ep.courseId !== episode.courseId);
    listWithoutEpisodeFromSameCourse.push(episode)
    
    return listWithoutEpisodeFromSameCourse

  }, [] as EpisodeInstance[]);

  return lastEpisodes
}

export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  },

  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes);
    return user;
  },

  getKeepWatchingList: async (id: number) => {
    const userWitchimgEpisodes = await User.findByPk(id, {
      include: {
        association: "Episodes",
        attributes:[
          'id',
          'name',
          'synopsis',
          'order',
          ['video_url','videoUrl'],
          ['seconds_long', 'secondsLong'],
          ['course_id', 'courseId'],
        ],
        include: [
          {
            association: "Course",
            attributes:[
              'id',
              'name',
              'synopsis',
              ['thumbnail_url', 'thumbnailUrl']
            ],
            as: 'course'
          },
        ],
        through: {
          as: "watchTime",
          attributes:[
            'seconds',
            ['updated_at', 'updatedAt']
          ]
        },
      },
    });

    if (!userWitchimgEpisodes) {
      throw new Error("Usuário não encontrado");
    }

    const keepWatchingList = filterLastEpisodesByCourse(userWitchimgEpisodes.Episodes!)

    // @ts-ignore
    keepWatchingList.sort((a,b)=> a.WatchTime?.updatedAt < b.WatchTime?.updatedAt ? 1 : -1)

    return keepWatchingList
  },
};
