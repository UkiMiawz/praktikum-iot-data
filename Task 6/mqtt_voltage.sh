while [ 1 ]
do
	tm=`/opt/vc/bin/vcgencmd measure_volts core`
	volt=`echo $tm| cut -d '=' -f2`
	mosquitto_pub -h 192.76.241.164 -t 'groupB/voltage' -m $volt
	sleep 5s
done