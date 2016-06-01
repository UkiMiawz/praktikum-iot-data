while [ 1 ]
do
	tm=`/opt/vc/bin/vcgencmd measure_temp`
	tc=`echo $tm| cut -d '=' -f2 | sed 's/..$//'`
	temp=`echo $tc°C`
	#echo $temp
	mosquitto_pub -t 'groupB/temperature' -m $temp
	sleep 5s
done