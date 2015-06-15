sudo apt-get autoremove hostapd
sudo apt-get autoremove isc-dhcp-server
sudo apt-get autoremove bind9

chattr -i /etc/resolv.conf

mv /usr/share/dbus-1/system-services/fi.epitest.hostap.WPASupplicant.service~/

wget https://github.com/jenssegers/RTL8188-hostapd/archive/v2.0.tar.gz
tar -zxvf v2.0.tar.gz
cd RTL8188-hostapd-2.0/hostapd
sudo make
sudo make install

cp /home/pi/DPRPi/createap/hostapd /etc/default/hostapd
cp /dev/null /etc/hostapd/hostapd.conf
cp /home/pi/DPRPi/createap/hostapd.conf /etc/hostapd/hostapd.conf

sudo apt-get install isc-dhcp-server
cp /dev/null /etc/dhcp/dhcpd.conf
cp /home/pi/DPRPi/createap/dhcpd.conf /etc/dhcp/dhcpd.conf
cp /home/pi/DPRPi/createap/isc-dhcp-server /etc/default/isc-dhcp-server
cp /home/pi/DPRPi/createap/interfaces /etc/network/interfaces
ifconfig wlan0 192.168.42.1

cp /home/pi/DPRPi/createap/sysctl.conf /etc/sysctl.conf
sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"

iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED, ESTABLISHED -j ACCEPT
iptables -A FORWARD -i FORWARD -i wlan0 -o eth0 -j ACCEPT

sh -c "iptables-save > /etc/iptables.ipv4.nat"

update-rc.d hostapd enable
update-rc.d isc-dhcp-server enable


apt-get install bind9 dnsutils
cp /home/pi/DPRPi/createap/named.conf.options /etc/bind/named.conf.options
cp /home/pi/DPRPi/createap/named.conf.local /etc/bind/named.conf.local
cp /home/pi/DPRPi/createap/db.delayplay-client.com /etc/bind/db.delayplay-client.com
cp /home/pi/DPRPi/createap/42.168.192.in-addr.arpa.zone /etc/bind/42.168.192.in-addr.arpa.zone
cp /home/pi/DPRPi/createap/resolv.conf /etc/resolv.conf
chattr +i /etc/resolv.conf

sudo service isc-dhcp-server restart
sudo service hostapd restart
