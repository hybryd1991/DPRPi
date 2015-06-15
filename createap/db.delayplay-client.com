$TTL 30
$ORIGIN delayplay-client.com.
 
@ IN SOA delayplay-client.com. admin.delayplay-client.com. (
    2015020301 ; Serial
            1d ; Refresh
            1h ; Retry
            1w ; Expire
            2h ; Negative Cache TTL
    )
 
@   IN   NS   delayplay-client.com.
@   IN   NS   ns.provider.org.
@   IN   A    192.168.42.1
