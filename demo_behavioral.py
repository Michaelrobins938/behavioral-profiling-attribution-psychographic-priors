"""
Behavioral Attribution Demo
===========================

Calculates the difference between Traditional and Behavioral attribution
to prove the business case for psychographic priors.
"""

from src.profiler import BehavioralAttribution
import json
import os

def run_demo():
    print("=" * 60)
    print("BEHAVIORAL PROFILING ATTRIBUTION DEMO")
    print("=" * 60)
    
    # 1. Initialize engine
    profiler = BehavioralAttribution(["High-Intent", "Low-Intent"])
    
    # 2. Generate large dataset
    print("\n1. Generating synthetic user journeys (5,000 users)...")
    df = profiler.generate_sample_data(5000)
    
    # 3. Analyze
    print("2. Running side-by-side analysis...")
    results = profiler.analyze(df)
    
    # 4. Show findings
    print("\nRESULTS:")
    print(f"  Total Value: ${results['summary']['total_value']:,.0f}")
    print(f"  Total Conversions: {results['summary']['total_conversions']}")
    
    print("\nTraditional Attribution (Market Standard):")
    for channel, value in results['traditional'].items():
        print(f"  - {channel:8}: ${value:,.0f}")
        
    print("\nBehavioral Breakdown:")
    for segment, scores in results['behavioral'].items():
        print(f"  Segment: {segment}")
        for channel, value in scores.items():
            print(f"    - {channel:8}: ${value:,.0f}")
            
    # 5. Quantify "Generalization Error"
    # Traditional says Search is $X for everyone.
    # But for Low-Intent, Search is actually worthless.
    low_intent_search = results['behavioral']['Low-Intent']['Search']
    high_intent_search = results['behavioral']['High-Intent']['Search']
    
    print("\nINSIGHT:")
    print(f"  Traditional attribution suggests Search drives ${results['traditional']['Search']:,.0f} value.")
    print(f"  However, profiling reveals {high_intent_search/results['traditional']['Search']:.1%} of this")
    print(f"  comes from High-Intent users while Low-Intent users contribute almost nothing.")
    print("  => Recommendation: Redirect Search budget from Low-Intent targets to High-Intent clusters.")
    
    # 6. Save for dashboard (Mock)
    os.makedirs('dashboard/src/data', exist_ok=True)
    with open('dashboard/src/data/analysis.json', 'w') as f:
        json.dump(results, f, indent=2)
    print("\nAnalysis saved to dashboard/src/data/analysis.json")

    print("\n" + "=" * 60)

if __name__ == "__main__":
    run_demo()
