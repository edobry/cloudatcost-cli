# cloudatcost-cli

a node-based command-line interface for your Cloud@Cost cloud

## Install

```
sudo npm install -g cloudatcost-cli
```

## Usage

Provide your credentials in `~/.cloudatcost`:
```json
{
    "key": "<api key>",
    "email": "you@domain.com"
}
```

Run this anywhere:
```
cloudatcost [<command>...]
```

Commands are specified fluently, options passed typical unix-style.

## Commands

### list

```
cloudatcost list <resource>
```

#### servers
your current servers

Example output:
```
Servers:

botnet (c11235-cloudpro-81321)
123.456.789.10
OS: Docker Ubuntu-14.04.1-LTS
2 CPUs: 33% in use
RAM: 298/1024 GBs in use
Storage: 9/20 GBs in use
Status: Powered On
```

#### tasks (_offline_)
pending tasks

Example output:
```
Action: Delete 5
Status: pending
Duration: 10 ms
```

#### templates
available disk images

Example output:
```
Templates:

1: CentOS 6.7 64bit                     	3: Debian-8-64bit                       	9: Windows 7 64bit
24: Windows 2008 R2 64bit               	25: Windows 2012 R2 64bit               	26: CentOS-7-64bit
27: Ubuntu-14.04.1-LTS-64bit            	28: Minecraft-CentOS-7-64bit            	74: FreeBSD-10-1-64bit
75: Docker-64bit
```

### pro
CloudPRO tools

```
cloudatcost pro <command>
```

#### build
Provisions an instance

Options:
 - **cpu**: # of cores
   default: **1**
 - **ram**: gb of memory
   default: **1024**
 - **storage**: gb of disk space
   default: **10**
 - **os**: disk image id
   default: **27** (Ubuntu-14.04.1-LTS-64bit)

#### delete
Deletes an instance

Options:
**sid**: server id

#### resources
Shows resource availability

Example output:
```
CloudPRO Resource Usage

CPU: 12/49 vCPUs
RAM: 9728/25202 MBs
Storage: 150/490 GBs
```
