from db.seed import seed
import sys

if __name__ == "__main__":
    opts = [opt for opt in sys.argv[1:] if opt.startswith("-")]
    if "-d" in opts or "-drop" in opts:
        seed(True, False)
    elif "-p" in opts or "-populate" in opts:
        seed(False, True)
    elif "--help" in opts or "-h" in opts or "-help" in opts:
        print(
            "The following flags are available.\n-d (-drop)\n-p (-populate)\n-h (-help)"
        )
