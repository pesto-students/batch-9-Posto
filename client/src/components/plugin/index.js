import RemarkIFrame from 'remark-iframes-extended';

const defaultPluginProperties = {
  default: {
    tag: 'iframe',
    width: 560,
    height: 315,
    disabled: false,
    replace: [
      ['http://', 'https://'],
    ],
    removeAfter: '&',
  },
};

const youtubePluginProperties = {
  'youtu.be': {
    disabled: false,
    oembed: 'https://www.youtube.com/oembed',
  },
  'www.youtube.com': {
    tag: 'iframe',
    width: 560,
    height: 315,
    disabled: false,
    replace: [
      ['watch?v=', 'embed/'],
      ['http://', 'https://'],
    ],
    thumbnail: {
      format: 'http://img.youtube.com/vi/{id}/0.jpg',
      id: '.+/(.+)$',
    },
    removeAfter: '&',
  },
};

const defaultPlugin = [RemarkIFrame, defaultPluginProperties];
const youtubePlugin = [RemarkIFrame, youtubePluginProperties];

export default [defaultPlugin, youtubePlugin];
