//
//  HomeViewController.m
//  PageViewDemo
//
//  Created by 陈良 on 16/4/24.
//  Copyright © 2016年 陈良. All rights reserved.
//

#import "HomeViewController.h"
#import "OneViewController.h"
#import "TwoViewController.h"
#import "ThreeViewController.h"

#define screen_width [UIScreen mainScreen].bounds.size.width
@interface HomeViewController ()

@property(nonatomic, strong) OneViewController *oneVc;
@property(nonatomic, strong) TwoViewController *twoVc;
@property(nonatomic, strong) ThreeViewController *threeVc;
@property(nonatomic, strong) UIScrollView *scrollView;
@property(nonatomic, strong) UIView *naviView;
@property(nonatomic, strong) UILabel *naviLable;
@property(nonatomic, strong) UIButton *oneBtn;
@property(nonatomic, strong) UIButton *twoBtn;
@property(nonatomic, strong) UIButton *threeBtn;

@end

@implementation HomeViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [self initUI];
    self.view.backgroundColor = [UIColor whiteColor];
    [self setMainScrollView];
}
-(instancetype)init{
   self = [super init];
    if (self == nil) {
        self = [[HomeViewController alloc]init];
    }
    return self;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)initUI{
    _naviView = [[UIView alloc]initWithFrame:CGRectMake(0, self.navigationController.navigationBar.frame.size.height + 20, screen_width, 40)];
    _naviView.backgroundColor = [UIColor colorWithRed:0.03 green:0.73 blue:1.00 alpha:1.00];
    //self.navigationItem.titleView = _naviView;
    [self.view addSubview:_naviView];
    
    _oneBtn = [[UIButton alloc]initWithFrame:CGRectMake(0, 0, screen_width/3, 40)];
    _oneBtn.titleLabel.font = [UIFont boldSystemFontOfSize:19];
    [_oneBtn setTitle:@"ONE" forState:UIControlStateNormal];
    _oneBtn.tag = 1;
    [_oneBtn addTarget:self action:@selector(clickButton:) forControlEvents:UIControlEventTouchUpInside];
    [_naviView addSubview:_oneBtn];
    
    
    _twoBtn = [[UIButton alloc]initWithFrame:CGRectMake(screen_width/3, 0, screen_width/3, 40)];
    _twoBtn.titleLabel.font = [UIFont boldSystemFontOfSize:16];
    [_twoBtn setTitle:@"TWO" forState:UIControlStateNormal];
    _twoBtn.tag = 2;
    [_twoBtn addTarget:self action:@selector(clickButton:) forControlEvents:UIControlEventTouchUpInside];
    [_naviView addSubview:_twoBtn];
    
    _threeBtn = [[UIButton alloc]initWithFrame:CGRectMake(screen_width*2/3, 0, screen_width/3, 40)];
    _threeBtn.titleLabel.font = [UIFont boldSystemFontOfSize:16];
    [_threeBtn setTitle:@"THREE" forState:UIControlStateNormal];
    _threeBtn.tag = 3;
    [_threeBtn addTarget:self action:@selector(clickButton:) forControlEvents:UIControlEventTouchUpInside];
    [_naviView addSubview:_threeBtn];
    
    _naviLable = [[UILabel alloc]initWithFrame:CGRectMake(0, 40 -2, screen_width/3, 4)];
    _naviLable.backgroundColor = [UIColor whiteColor];
    [_naviView addSubview:_naviLable];
}

-(void)setMainScrollView{
    _scrollView = [[UIScrollView alloc]initWithFrame:CGRectMake(0, self.navigationController.navigationBar.frame.size.height + 60, screen_width, [UIScreen mainScreen].bounds.size.height - 40)];
    _scrollView.delegate = self;
    _scrollView.backgroundColor = [UIColor whiteColor];
    _scrollView.pagingEnabled = YES;
    _scrollView.showsHorizontalScrollIndicator = NO;
    _scrollView.showsVerticalScrollIndicator = NO;
    [self.view addSubview:_scrollView];
    
    NSArray *views = @[self.oneVc.view,self.twoVc.view,self.threeVc.view];
    for (int i = 0; i < views.count; i ++) {
        UIView *pageView = [[UIView alloc]initWithFrame:CGRectMake(screen_width * i, 0, _scrollView.frame.size.width, _scrollView.frame.size.height)];
        [pageView addSubview:views[i]];
        [_scrollView addSubview:pageView];
    }
    _scrollView.contentSize = CGSizeMake(screen_width * views.count, 0);
}

-(void)scrollViewDidScroll:(UIScrollView *)scrollView{
    double index = scrollView.contentOffset.x / screen_width;
    [self naviLableTranslateWithButtonTag:(int)(index +0.5)+1];
}

-(void)clickButton:(UIButton *)btn{
    [self naviLableTranslateWithButtonTag:btn.tag];
    [UIView animateWithDuration:0.3 animations:^{
        _scrollView.contentOffset = CGPointMake(screen_width * (btn.tag - 1), 0);
    }];
}

-(UIButton *) buttonWithTag:(NSInteger)tag{
    switch (tag) {
        case 1:
            return _oneBtn;
            break;
        case 2:
            return _twoBtn;
            break;
        case 3:
            return _threeBtn;
            break;
            
        default:
            return nil;
            break;
    }
}
-(void)naviLableTranslateWithButtonTag:(NSInteger)tag{
    UIButton *btn = [self buttonWithTag:tag];
    btn.selected = YES;
    [UIView animateWithDuration:0.3 animations:^{
        _naviLable.frame = CGRectMake(btn.frame.origin.x, _naviLable.frame.origin.y, _naviLable.frame.size.width, 4);
    } completion:^(BOOL finished) {
        _oneBtn.titleLabel.font = [UIFont systemFontOfSize:16];
        _twoBtn.titleLabel.font = [UIFont systemFontOfSize:16];
        _threeBtn.titleLabel.font = [UIFont systemFontOfSize:16];
        btn.titleLabel.font = [UIFont systemFontOfSize:19];
        
    }];
}

-(OneViewController *)oneVc{
    if (_oneVc == nil) {
        _oneVc = [[OneViewController alloc]init];
    }
    return _oneVc;
}

-(TwoViewController *)twoVc{
    if (_twoVc == nil) {
        _twoVc = [[TwoViewController alloc]init];
    }
    return  _twoVc;
}

-(ThreeViewController *)threeVc{
    if (_threeVc == nil) {
        _threeVc = [[ThreeViewController alloc]init];
    }
    return _threeVc;
}


@end
