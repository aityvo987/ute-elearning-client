
import { useGetCoursesAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React, { FC, useEffect, useState } from 'react'
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    Label,
    YAxis,
    LabelList,
} from "recharts";
import Loader from '../../Loader/Loader';
import { styles } from '@/app/styles/styles';
type Props = {
}

const CoursesAnalytics: FC<Props> = (props: Props) => {
    const { data, isLoading, isError } = useGetCoursesAnalyticsQuery({});
    // const analyticsData = [
    //     { name: 'Jun 2023', uv: 3 },
    //     { name: 'July 2023', uv: 2 },
    //     { name: 'August 2023', uv: 5 },
    //     { name: 'Sept 2023', uv: 7 },
    //     { name: 'October 2023', uv: 2 },
    //     { name: 'Nov 2023', uv: 5 },
    //     { name: 'December 2023', uv: 7 },
    // ];

    const analyticsData:any = [];
    data &&
        data.courses.last12Months.forEach((item: any) => {
            analyticsData.push({ name: item.month, uv: item.count });
        });

    const minValue = 0;
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className="mt-[120px] h-fit ml-6">
                        <div className="mt-[50px]">
                            <h1 className={`${styles.title} px-5 !text-start`}>
                                Courses Analytics
                            </h1>
                            <p className={`${styles.label} px-5`}>
                                Last 12 months analytics data
                            </p>
                        </div>

                        <div className="w-full h-[80%] flex items-center justify-center">
                            <ResponsiveContainer width="90%" height="50%">
                                <BarChart data={analyticsData}>
                                    <XAxis dataKey="name">
                                        <Label offset={0} position="insideBottom" />
                                    </XAxis>
                                    <YAxis domain={[minValue, "auto"]} />
                                    <Bar dataKey="uv" fill="#3faf82">
                                        <LabelList dataKey="uv" position="top" />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }
        </>
    )
}
export default CoursesAnalytics