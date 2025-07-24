from scapy.all import ARP, Ether, srp
import socket
import requests

# Raspberry Pi MAC Address Prefixes (OUIs) - Updated with more recent ones
RASPBERRY_PI_OUIS = ["B8:27:EB", "DC:A6:32", "E4:5F:01", "28:CD:C1"]

def get_local_network():
    """Determine the local network IP range."""
    try:
        # Better method to get actual network interface IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        
        # For your specific network (172.16.x.x), handle larger subnet
        if local_ip.startswith("172.16."):
            return "172.16.0.0/21"  # Based on your ifconfig showing /21
        else:
            subnet = ".".join(local_ip.split(".")[:3]) + ".0/24"
            return subnet
    except:
        return "192.168.1.0/24"  # Default fallback

def get_mac_vendor(mac_address):
    """Fetch manufacturer details from macvendors API."""
    try:
        response = requests.get(f"https://api.macvendors.com/{mac_address}", timeout=3)
        if response.status_code == 200:
            return response.text.strip()
        else:
            return "Unknown"
    except:
        return "Unknown"

def scan_network(network):
    """Scan the network for active IPs and MAC addresses."""
    arp = ARP(pdst=network)
    ether = Ether(dst="ff:ff:ff:ff:ff:ff")
    packet = ether / arp
    result = srp(packet, timeout=3, verbose=False)[0]  # Increased timeout

    devices = []
    for sent, received in result:
        mac = received.hwsrc.upper()
        vendor = get_mac_vendor(mac)
        is_raspberry_pi = any(mac.startswith(oui) for oui in RASPBERRY_PI_OUIS)
        devices.append((received.psrc, mac, vendor, is_raspberry_pi))

    return devices

if __name__ == "__main__":  # Fixed the main check
    network = get_local_network()
    print(f"Scanning network: {network}...\n")

    devices = scan_network(network)

    if not devices:
        print("No devices found. Make sure you're running with sudo privileges.")
        print("Try: sudo python3 script_name.py")
    else:
        print("IP Address\t\tMAC Address\t\tManufacturer\t\t\tRaspberry Pi")
        print("="*90)
        for ip, mac, vendor, is_raspberry_pi in devices:
            pi_status = "✅ YES" if is_raspberry_pi else "❌ NO"
            # Better formatting to handle long vendor names
            vendor_short = vendor[:20] + "..." if len(vendor) > 20 else vendor
            print(f"{ip:<15}\t{mac:<17}\t{vendor_short:<23}\t{pi_status}")
        
        # Show only Raspberry Pis
        pi_devices = [d for d in devices if d[3]]
        if pi_devices:
            print(f"\n🍓 Found {len(pi_devices)} Raspberry Pi(s):")
            for ip, mac, vendor, _ in pi_devices:
                print(f"  IP: {ip} | MAC: {mac}")
        else:
            print("\n🔍 No Raspberry Pi devices detected.")