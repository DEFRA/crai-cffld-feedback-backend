import { parse } from 'date-fns'

const schema = {
  'Qualtrics ID': {
    prop: 'qualtrics_id',
    required: true,
    type: String
  },
  Source: {
    prop: 'source',
    required: true,
    type: String
  },
  'Date and Time': {
    prop: 'date_time',
    required: true,
    type: (value) => {
      const date = parse(value, 'dd/MM/yyyy HH:mm', new Date())

      if (isNaN(date.getTime())) {
        throw new Error('Invalid date')
      }

      return date
    }
  },
  Browser: {
    prop: 'browser',
    required: true,
    type: String
  },
  Version: {
    prop: 'version',
    required: true,
    type: String
  },
  'Operating System': {
    prop: 'operating_system',
    required: true,
    type: String
  },
  'Screen Size': {
    prop: 'screen_size',
    required: true,
    type: String
  },
  Rating: {
    prop: 'rating',
    required: true,
    type: String
  },
  'Flood risk area y/n': {
    prop: 'is_flood_risk_area',
    required: true,
    type: String
  },
  'Station issue y/n': {
    prop: 'is_station_issue',
    required: true,
    type: String
  },
  WebchatID: {
    prop: 'webchat_id',
    type: String
  },
  Duration: {
    prop: 'duration',
    required: true,
    type: Number
  },
  'Lat Long (Redacted)': {
    prop: 'lat_long',
    type: String
  },
  Comments: {
    prop: 'comments',
    required: true,
    type: String
  }
}

module.exports = schema
