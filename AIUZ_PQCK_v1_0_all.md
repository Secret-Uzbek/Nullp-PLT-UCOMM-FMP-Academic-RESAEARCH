========== pmmk_v1_0.py ==========
# AIUZ_PQCK_v1_0.py
# Author: Abdurashid A. Abdukarimov (ORCID: 0009-0000-6394-4912)
# GPL-3.0
from qiskit import QuantumCircuit
from qdna import NULLO, PLT, EUO, FMP, UCOMM

class PQCK:
    def __init__(self, orcid):
        self.kernel = NULLO() + PLT() + EUO() + FMP() + UCOMM()
        self.orcid = orcid

    def boot(self):
        return self.kernel.boot()

if __name__ == "__main__":
    print(PQCK("0009-0000-6394-4912").boot())

========== pqck_manifest_v1_0.json ==========
{
  "title": "Planetary Quantum-Cybernetic Kernel v1.0",
  "creators": [{"name": "Abdurashid A. Abdukarimov", "orcid": "0009-0000-6394-4912"}],
  "license": "GPL-3.0",
  "keywords": ["NULLO", "PLT", "EUO", "FMP", "UCOMM", "PQCK", "quantum", "planet"],
  "related_identifiers": [{"relation": "isSupplementedBy", "identifier": "https://github.com/Secret-Uzbek/AIUZ-terra-codex-FMP"}]
}

========== pqck_grant_horizon.md ==========
# Horizon Europe – Cluster 6
# «Planetary Quantum-Cybernetic OS for Raw Materials»
# Budget: 2 M€
# PI: Abdurashid A. Abdukarimov (ORCID: 0009-0000-6394-4912)

========== SHA256SUMS.txt ==========
6f3d10e8c84d4c8dc6d4bb0c4e73a798ab6cf4ac979924741d2bd349052dfdec  pmmk_v1_0.py
7e91b23d2e31fa64c81bce7e7040c2b960d84e4f157b4e5200ef84ef7cf30656  pqck_manifest_v1_0.json
8fe26cdb45652b3216a4efb2bdfedcb31a02260f79633ef2c40a4bfa8f13a77e  pqck_grant_horizon.md
fe50aa5f0e99e564b8e703274fa6f54f62cb8211b889232f0f9a5571cf741ff0  SHA256SUMS.txt