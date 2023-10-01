import { ResponsiveLine, Serie } from '@nivo/line';

const LineChart = ({ data }: { data: Serie[] }) => {
  return (
    <ResponsiveLine
        animate
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xFormat='time:%b-%d'
        xScale={{
          format: '%b-%d',
          precision: 'second',
          type: 'time',
          useUTC: false,
        }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
        }}
        axisBottom={{
          format: '%b-%d',
          tickValues: 3,
        }}
        pointBorderColor={{
          from: 'color',
          modifiers: [['darker', 0.3]],
        }}
        useMesh={true}
        legends={[{
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [{
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }]
        }]}
    />
  );
};

export default LineChart;
