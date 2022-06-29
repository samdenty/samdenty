import { useQuery } from "react-query";
import styled from "@emotion/styled";
import { MilesChart } from "./MilesChart";
import { ChangeEvent, useEffect, useState } from "react";

export type MilesTuple =
  | [date: string, miles: number]
  | [date: string, miles: number, current: true];

interface Distance {
  milesByWeek: MilesTuple[];
  milesByMonth: MilesTuple[];
}

const Radios = styled.ul`
  display: flex;
  flex-direction: column;
  background: #714434;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 100;
  margin: 0;
`;

const Label = styled.label`
  display: flex;
  font-size: 12px;
  line-height: 21px;
  cursor: pointer;
  color: #bb8064;
  font-weight: 500;
`;

const Input = styled.input`
  margin-right: 8px;
  position: relative;

  &:checked:after {
    background-color: #ff8a51;
    border-color: #ff8a51;
    box-shadow: 0 0 0 1px inset #714434;
  }

  &:after {
    width: 12px;
    height: 12px;
    border-radius: 15px;
    top: 0px;
    left: -2px;
    position: absolute;
    background-color: #5d3324;
    content: "";
    display: inline-block;
    visibility: visible;
    border: 2px solid #5d3324;
  }
`;

const StyledMiles = styled.div`
  position: relative;
`;

const MilesPer = styled.span`
  color: #e0ad95;
  font-size: 11px;
  text-align: center;
  font-weight: 600;
  padding: 2px 13px;
  border-bottom: 1px solid #e0ad954d;
  margin-bottom: 2px;
`;

const MileCount = styled.span`
  margin-left: auto;
  padding-left: 4px;
  color: #f96f2d;
`;

export interface MilesProps {
  width?: number;
  height?: number;
  onLoad?(): void;
}

export function Miles({ onLoad, ...props }: MilesProps) {
  const [selected, setSelected] = useState("week");

  const miles = useQuery(
    "distanceByWeek",
    (): Promise<Distance> =>
      fetch("https://samdenty-strava.deno.dev/").then((r) => r.json()),
    { cacheTime: 12 * 60 * 60 }
  );

  useEffect(() => {
    if (miles.isFetched) {
      onLoad?.();
    }
  }, [miles.isFetched]);

  function handleClick(e: ChangeEvent<HTMLInputElement>) {
    setSelected(e.currentTarget.value);
  }

  return miles.data ? (
    <StyledMiles>
      <Radios>
        <MilesPer>Miles per</MilesPer>

        <Label htmlFor="week">
          <Input
            type="radio"
            id="week"
            name="miles"
            value="week"
            checked={selected === "week"}
            onChange={handleClick}
          />
          Week
          <MileCount>
            (
            {parseInt(
              miles.data.milesByWeek.find((week) => week[2])![1].toString()
            )}
            )
          </MileCount>
        </Label>
        <Label htmlFor="month">
          <Input
            type="radio"
            id="month"
            name="miles"
            value="month"
            checked={selected === "month"}
            onChange={handleClick}
          />
          Month
          <MileCount>
            (
            {parseInt(
              miles.data.milesByMonth.find((month) => month[2])![1].toString()
            )}
            )
          </MileCount>
        </Label>
      </Radios>

      {selected === "week"
        ? miles.data?.milesByWeek && (
            <MilesChart {...props} miles={miles.data.milesByWeek} />
          )
        : miles.data?.milesByMonth && (
            <MilesChart {...props} miles={miles.data.milesByMonth} />
          )}
    </StyledMiles>
  ) : null;
}
