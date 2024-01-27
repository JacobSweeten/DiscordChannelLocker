function checkTime(hours, minutes, startTimeHours, startTimeMinutes, stopTimeHours, stopTimeMinutes)
{
	if(startTimeHours > stopTimeHours)
	{
		// Check hours
		if(hours >= startTimeHours)
		{
			// Check minutes if necessary
			if(hours == startTimeHours)
			{
				if(minutes >= startTimeMinutes)
				{
					return true;
				}
				else
				{
					return false;
				}
			}
			else
			{
				return true;
			}
		}
		else if(hours <= stopTimeHours)
		{
			if(hours == stopTimeHours)
			{
				if(minutes < stopTimeMinutes)
				{
					return true;
				}
				else
				{
					return false;
				}
			}
			else
			{
				return true;
			}
		}
		else
		{
			return false;
		}
	}
	else if(startTimeHours < stopTimeHours)
	{
		// Check hours
		if(hours >= startTimeHours && hours <= stopTimeHours)
		{
			// Check minutes if necessary
			if(hours == startTimeHours)
			{
				if(minutes >= startTimeMinutes)
				{
					return true;
				}
				else
				{
					return false;
				}
			}
			else if(hours == stopTimeHours)
			{
				if(minutes < stopTimeMinutes)
				{
					return true;
				}
				else
				{
					return false;
				}
			}
			else
			{
				return true;
			}
		}
		else
		{
			return false;
		}
	}
	else
	{
		if(startTimeMinutes > stopTimeMinutes)
		{
			if(hours == startTimeHours)
			{
				if(minutes >= startTimeMinutes || minutes < stopTimeMinutes)
				{
					return true;
				}
				else
				{
					return false;
				}
			}
			else
			{
				return true;
			}
		}
		else
		{
			if(minutes >= startTimeMinutes && minutes < stopTimeMinutes)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}
}

function testCheckTime(hours, minutes, startTimeHours, startTimeMinutes, stopTimeHours, stopTimeMinutes, expected, testNo)
{
	if(checkTime(hours, minutes, startTimeHours, startTimeMinutes, stopTimeHours, stopTimeMinutes) != expected)
	{
		console.log("Fail " + testNo.toString());
	}
	else
	{
		console.log("Pass " + testNo.toString());
	}
}

module.exports = checkTime;


if(require.main == module)
{
	testCheckTime(5, 0, 5, 0, 12, 0, true, 1);
	testCheckTime(4, 59, 12, 0, 5, 0, true, 2);
	testCheckTime(5, 0, 0, 0, 5, 0, false, 3);
	testCheckTime(0, 30, 23, 0, 2, 0, true, 4);
	testCheckTime(12, 0, 23, 0, 2, 0, false, 5);
	testCheckTime(6, 30, 6, 15, 6, 45, true, 6);
	testCheckTime(6, 30, 6, 45, 6, 15, false, 7);
	testCheckTime(7, 30, 6, 45, 6, 15, true, 8);
}

